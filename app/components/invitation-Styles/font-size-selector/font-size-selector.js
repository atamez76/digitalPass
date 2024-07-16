import classes from "./font-size-selector.module.css";
import { useState, useEffect } from "react";
import { useFontSize } from "@/app/lib/store";

export default function FontSizeSelector(props) {
  const [fontSize, setFontSize] = useState(props.styles.font_size);

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };


  const newFontSize = useFontSize((state) => state.setNewFontSize);

  useEffect(() => {
    newFontSize(fontSize);
  }, [fontSize]);

  return (
    <div className={classes.form_control}>
      <label htmlFor="font_size">Font Size</label>
      <select id="font_size" name="font_size" onChange={handleFontSizeChange}>
        <option></option>
        <option>small</option>
        <option>medium</option>
        <option>large</option>
        <option>Larger</option>
      </select>
    </div>
  );
}
