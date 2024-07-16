"use client";
import classes from "./filter-selectors.module.css";
import { useState, useEffect } from "react";
import { useImageFilters } from "@/app/lib/store";

export  default function ImageFilters(props) {
  const [opacity, setOpacity] = useState(props.styles.opacity);
  const [grayScale, setGrayScale] = useState(props.styles.grayscale);

  
  const handleOpacityChange = (e) =>{
    setOpacity(e.target.value)
  }

  const handleGrayScaleChange = (e) =>{
    setGrayScale(e.target.value)
  }



  const newOpacity = useImageFilters((state) => state.setNewOpacity);
  const newGrayScale = useImageFilters((state) => state.setNewGrayScale);

  useEffect(() => {
    newOpacity(opacity);
    newGrayScale(grayScale);
  }, [opacity, grayScale]);

  return (
    <>
      <div className={classes.control}>
        <input
          type="range"
          id="opacity"
          name="opacity"
          min="0"
          max="1"
          step="0.1"
          onChange={handleOpacityChange}
          value={opacity}
        ></input>
        <label htmlFor="opacity">Opacity</label>
      </div>
      <div className={classes.control}>
        <input
          type="range"
          id="grayscale"
          name="grayscale"
          min="0"
          max="1"
          step="0.1"
          onChange={handleGrayScaleChange}
          value={grayScale}
        ></input>
        <label htmlFor="grayscale">Grey Scale</label>
      </div>
    </>
  );
}
