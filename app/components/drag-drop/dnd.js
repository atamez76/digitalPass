"use client";

import classes from "./dnd.module.css";
import Pass from "../passes/pass";
import { useState } from "react";
import { useDrop } from "react-dnd";
import Link from "next/link";

export default function DnD(props) {
  const passTemplateData = JSON.parse(props.templates);
  const [board, setBoard] = useState("");

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addPassToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addPassToBoard = (id) => {
    const selectedTemplate = passTemplateData.filter(
      (template) => template._id === id
    );
    setBoard(selectedTemplate[0]);
  };

  return (
    <>
      <div className={classes.pass_grid}>
        {passTemplateData.map((template, index) => (
          <Pass data={template} key={index} />
        ))}
      </div>
      <div className={classes.dropzone_wrapper}>
        <div className={classes.dropzone} ref={drop}>
          {board !== "" ? (
            <Pass data={board} />
          ) : (
            <p className={classes.placeholder}>Drag Invitation here</p>
          )}
        </div>
        {board && <Link href={`events/new?template=${board.template}`} className={classes.btn}>Continue</Link>}
      </div>
    </>
  );
}
