"use client";
import { DndProvider } from "react-dnd";
import classes from "./dnd-provider.module.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import DnD from "./dnd";
import {
  useFontSize,
  useImage,
  useFormDataStore,
  useSelectedFont,
  useImageFilters,
  useFontColor,
  useTemplateColor,
} from "@/app/lib/store";
import { useEffect } from "react";

export default function DnDProvider({ templates }) {

 
  const setImage = useImage((state) => state.setNewImg);
  const setSelectingImage = useImage((state) => state.setIsSelectingImage);
  const setTitle = useFormDataStore((state) => state.setNewTitle);
  const setHost = useFormDataStore((state) => state.setNewHost);
  const setSubTitle = useFormDataStore((state) => state.setNewSubTitle);
  const setDescription = useFormDataStore((state) => state.setNewDescription);
  const setTypeOfEvent = useFormDataStore((state) => state.setNewTypeOfEvent);
  const setDate = useFormDataStore((state) => state.setNewDate);
  const setTime = useFormDataStore((state) => state.setNewTime);
  const setVenue = useFormDataStore((state) => state.setNewVenue);
  const setAddress = useFormDataStore((state) => state.setNewAddress);
  const setgGeo = useFormDataStore((state) => state.setNewLatLng);
  const setSelectedFont = useSelectedFont((state) => state.setNewSelectedFont);
  const setOpacity = useImageFilters((state) => state.setNewOpacity);
  const setGrayScale = useImageFilters((state) => state.setNewGrayScale);
  const setFontColor = useFontColor((state) => state.setNewFontColor);
  const setTemplateColor = useTemplateColor(
    (state) => state.setNewTemplateColor
  );
  const clearFont = useFontSize((state) => state.clearFontsize);

  useEffect(() => {
    clearFont();
    setImage(null);
    setSelectingImage(false); 
    setTitle(null);
    setHost(null);
    setSubTitle(null);
    setDescription(null);
    setTypeOfEvent(null);
    setDate(null);
    setTime(null);
    setVenue(null);
    setAddress(null);
    setgGeo(null);
    setSelectedFont(null);
    setOpacity(null);
    setGrayScale(null);
    setFontColor(null);
    setTemplateColor(null);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.dnd_area}>
        <DnD templates={templates} />
      </div>
    </DndProvider>
  );
}
