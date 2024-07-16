"use client";
import classes from "./color-picker.module.css";
import { HexColorPicker } from "react-colorful";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useTemplateColor } from "@/app/lib/store";

export default function ColorPicker(props) {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [color, setColor] = useState(props.styles.background_color);

  const setVisible = () => {
    if (!colorPickerVisible) {
      setColorPickerVisible(true);
    } else {
      setColorPickerVisible(false);
    }
  };
  const [value] = useDebounce(color, 500);
  const newTempColor = useTemplateColor((state) => state.setNewTemplateColor);

  useEffect(() => {
    newTempColor(value);
  }, [value]);

  return (
    <div className={classes.color_selector_wrapper}>
      <label>Background color</label>
      <div className={classes.color_data}>
        <div
          style={{
            background: `${useTemplateColor((state) => state.templateColor)}`,
            width: "1rem",
            height: "1rem",
          }}
        ></div>
        <div>
          <span>{props.styles.background_color}</span>
        </div>
        {colorPickerVisible === false ? (
          <button className={classes.btn} onClick={setVisible}>
            <span className="material-symbols-outlined">edit</span>
          </button>
        ) : (
          <button className={classes.btn} onClick={setVisible}>
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>
      <div className={classes.color_picker}>
        {colorPickerVisible === true ? (
          <HexColorPicker color={color} onChange={setColor} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
