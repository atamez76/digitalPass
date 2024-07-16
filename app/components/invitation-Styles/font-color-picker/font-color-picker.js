"use client";
import classes from "./font-color-picker.module.css";
import { HexColorPicker } from "react-colorful";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useFontColor } from "@/app/lib/store";

export default function FontColorPicker(props) {
  const [fontColorPickerVisible, setFontColorPickerVisible] = useState(false);
  const [color, setColor] = useState(props.styles.font_color);

  const setVisible = () => {
    if (!fontColorPickerVisible) {
        setFontColorPickerVisible(true);
    } else {
        setFontColorPickerVisible(false);
    }
  };
  const [value] = useDebounce(color, 500);
  const newFontColor = useFontColor((state) => state.setNewFontColor);

  useEffect(() => {
    newFontColor(value);
  }, [value]);

  return (
    <div className={classes.color_selector_wrapper}>
      <label>Font color</label>
      <div className={classes.color_data}>
        <div
          style={{
            background: `${useFontColor((state) => state.FontColor)}`,
            width: "1rem",
            height: "1rem",
          }}
        ></div>
        <div>
          <span>{props.styles.font_color}</span>
        </div>
        {fontColorPickerVisible === false ? (
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
        {fontColorPickerVisible === true ? (
          <HexColorPicker color={color} onChange={setColor} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
