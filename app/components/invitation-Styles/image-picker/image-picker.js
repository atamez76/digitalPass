"use client";

import Image from "next/image";
import classes from "./image-picker.module.css";
import { useRef, useState } from "react";


export default function ImagePicker(props) {
  const imageInput = useRef();
  const [selectedFile, setSelectedFile] = useState();

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (file) {
      //removing diacritical mark from file name
      const normalizedName = file.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      // replacing spaces and special characters
      const objectName = normalizedName
        .replace(/[!@#$%^&*(),?" ":{}|<>´]/g, "_")
        .toLowerCase();
      props.onfileNamefixed(objectName);
    }

    if (!file) {
      setSelectedFile({});
      props.onFileSelected(false);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setSelectedFile(fileReader.result);
      props.onFileSelected(true);
    };

    fileReader.readAsDataURL(file);
  }

  function handlePickClick() {
    imageInput.current.click();
  }

  return (
    <div className={classes.picker}>
      <div className={classes.control}>
        <input
          className={classes.input}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name={props.input_name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Select File
        </button>
        <div className={classes.preview}>
          {selectedFile && (
            <Image
              src={selectedFile}
              alt="Image selected by the user"
              height={115}
              width={115}
            />
          )}
        </div>
      </div>
    </div>
  );
}
