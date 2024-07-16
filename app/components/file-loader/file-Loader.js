"use client";
import classes from "./file-loader.module.css";
import { useRef } from "react";
import Papa from "papaparse";
import { saveContacts } from "@/app/lib/actions";
import { useState } from "react";

import Loader from "../ui-elements/loader";

export default function FileLoader(props) {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const fileInput = useRef();

  const handleFile = (event) => {
    const file = document.getElementById("file");
    setIsLoadingData(true);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function (result) {
        const required_fields = ["First_Name", "Last_Name", "Email", "Phone"];
        const contact_list = [];
        for (let i = 0; i < result.data.length; i++) {
          const isValid = required_fields.every((field) =>
            Object.keys(result.data[i]).includes(field)
          );
          if (!isValid) {
            alert(
              "File must be in CSV format at columns titles must not be modified"
            );
            setIsLoadingData(false);
            break;
          } else {
            const normalizedFirst_Name = result.data[i].First_Name.normalize(
              "NFD"
            ).replace(/[\u0300-\u036f]/g, "");
            const First_Name = normalizedFirst_Name
              .replace(/[!@#$%^&*(),?" ":{}|<>´]/g, "_")
              .toLowerCase();
            const normalizedLast_Name = result.data[i].Last_Name.normalize(
              "NFD"
            ).replace(/[\u0300-\u036f]/g, "");
            const Last_Name = normalizedLast_Name
              .replace(/[!@#$%^&*(),?" ":{}|<>´]/g, "_")
              .toLowerCase();
            const randomDigit = Math.random().toString().substring(2, 10);
            contact_list.push({
              key: `${First_Name}-${Last_Name}-${randomDigit}`,
              First_Name: result.data[i].First_Name,
              Last_Name: result.data[i].Last_Name,
              Email: result.data[i].Email,
              Phone: result.data[i].Phone,
            });
          }
        }
        const res = await saveContacts(props.event, props.slug, contact_list);
        if (res.modifiedCount > 0) {
          props.onLoadData("Data Updated");
          setTimeout(() => setIsLoadingData(false), 4000);
        } else {
          props.onLoadData(res.message);
          file.value = "";
          setTimeout(() => setIsLoadingData(false), 4000);
        }
      },
    });
  };

  function handlePickClick() {
    fileInput.current.click();
  }

  return (
    <div className={classes.picker}>
      <div className={classes.control}>
        <input
          className={classes.input}
          type="file"
          id="file"
          accept=".csv"
          name="file"
          ref={fileInput}
          onChange={handleFile}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
          disabled={isLoadingData ? true : false}
        >
          {isLoadingData ? <Loader /> : "Pick CSV File"}
        </button>
      </div>
    </div>
  );
}
