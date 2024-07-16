"use client";
import classes from "./forms.module.css";
import { usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";
import { useFormDataStore, useImage } from "@/app/lib/store";
import { saveNewEvent } from "@/app/lib/actions";
import {
  useTemplateColor,
  useFontColor,
  useImageFilters,
  useSelectedFont,
  useFontSize,
} from "@/app/lib/store";
import SubmitContactForm from "../../forms/submit-contact-form";
import { vars } from "@/app/lib/vars";
import { useFormState } from "react-dom";

export default function F02(params) {
  const path = usePathname();

  const [formIncomplete, setFormIncomplete] = useState(true);

  const title = useFormDataStore((state) => state.title);
  const subTitle = useFormDataStore((state) => state.subTitle);
  const host = useFormDataStore((state) => state.host);
  const typeOfEvent = useFormDataStore((state) => state.typeOfEvent);
  const date = useFormDataStore((state) => state.date);
  const time = useFormDataStore((state) => state.time);
  const venue = useFormDataStore((state) => state.venue);
  const address = useFormDataStore((state) => state.address);
  const templateColor = useTemplateColor((state) => state.templateColor);
  const fontColor = useFontColor((state) => state.FontColor);
  const opacity = useImageFilters((state) => state.Opacity);
  const grayScale = useImageFilters((state) => state.GrayScale);
  const selectedfont = useSelectedFont((state) => state.selectedFont);
  const fontSize = useFontSize((state) => state.fontSize);
  const selectedimg = useImage((state) => state.img)

  const newFormTitle = useFormDataStore((state) => state.setNewTitle);
  const newFormSubTitle = useFormDataStore((state) => state.setNewSubTitle);
  const newFormHost = useFormDataStore((state) => state.setNewHost);
  const newTypeOfEvent = useFormDataStore((state) => state.setNewTypeOfEvent);
  const newFormDate = useFormDataStore((state) => state.setNewDate);
  const newFormTime = useFormDataStore((state) => state.setNewTime);
  const newFormVenue = useFormDataStore((state) => state.setNewVenue);
  const newFormAddress = useFormDataStore((state) => state.setNewAddress);
  const isSelectingImage = useImage((state) => state.setIsSelectingImage);

  const latLng = useFormDataStore((state) => state.latLng);

  const handleMapBtn = (e) => {
    e.preventDefault();
    params.onMapVisible(true, getGeo());
  };

  const debouncedTitle = useDebouncedCallback((value) => {
    newFormTitle(value);
  }, 1000);

  const debounceSubTitle = useDebouncedCallback((value) => {
    newFormSubTitle(value);
  }, 1000);

  const debouncedHost = useDebouncedCallback((value) => {
    newFormHost(value);
  }, 1000);

  const debounceDate = useDebouncedCallback((value) => {
    newFormDate(value);
  }, 1000);

  const debounceTime = useDebouncedCallback((value) => {
    newFormTime(value);
  }, 1000);

  const debounceVenue = useDebouncedCallback((value) => {
    newFormVenue(value);
  }, 1000);

  const debounceAddress = useDebouncedCallback((value) => {
    newFormAddress(value);
  }, 1000);

  
  const handleSelectChange = (e) => {
    const option = e.target.value;
    newTypeOfEvent(option);
  };


  useEffect(() => {
    if (title && host && subTitle && date && time && venue && address && typeOfEvent) {
      setFormIncomplete(false);
    } else {
      setFormIncomplete(true);
    }
  }, [title, host, subTitle, date, time, venue, address, typeOfEvent]);

  const getGeo = () => {
    if (path.includes("new")) {
      return vars.defaultLocation;
    } else if (params.template.geo) {
      const geo = params.template.geo;
      const latLngArray = geo.split(",");
      const coordinates = {};
      coordinates.lat = parseFloat(latLngArray[0]);
      coordinates.lng = parseFloat(latLngArray[1]);
      return coordinates;
    } else {
      return null;
    }
  };

  const handleImageChange = () =>{
    isSelectingImage(true)
   }

  const [state, formAction] = useFormState(saveNewEvent, { message: null });

  return (
    <>
      <form className={classes.form} action={formAction}>
        <div className={classes.form_control}>
          <label htmlFor="title">Event Title</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={path.includes("new") ? title : params.template.title}
            readOnly={params.readOnly}
            className={params.readOnly ? classes.disabled : ""}
            onChange={(e) => debouncedTitle(e.target.value)}
          />
        </div>
        <div className={classes.form_control}>
          <label htmlFor="subTitle">Event sub Title</label>
          <input
            id="subTtitle"
            name="subTtitle"
            type="text"
            readOnly={params.readOnly}
            defaultValue={path.includes("new") ? subTitle : params.template.sub_title}
            className={params.readOnly ? classes.disabled : ""}
            onChange={(e) => debounceSubTitle(e.target.value)}
          />
        </div>
        <div className={classes.form_control}>
          <label htmlFor="host">Host</label>
          <input
            id="host"
            name="host"
            type="text"
            defaultValue={path.includes("new") ? host : params.template.host}
            readOnly={params.readOnly}
            className={params.readOnly ? classes.disabled : ""}
            onChange={(e) => debouncedHost(e.target.value)}
            required
          />
        </div>
        <div className={classes.form_control}>
          <label htmlFor="typeevent">Type of Event</label>
          <select
            id="typeEvent"
            name="typeEvent"
            readOnly={params.readOnly}
            className={params.readOnly ? classes.disabled : ""}
            defaultValue={path.includes("new") ? typeOfEvent : params.template.type}
            onChange={handleSelectChange}
          >
            {params.eventList.map((object) => (
              <option value={Object.keys(object)} key={Object.keys(object)}>
                {Object.values(object)}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.form_control}>
          <label htmlFor="date">Event Date</label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={path.includes("new") ? date : params.template.date}
            readOnly={params.readOnly}
            className={params.readOnly ? classes.disabled : ""}
            onChange={(e) => debounceDate(e.target.value)}
          />
        </div>
        <div className={classes.form_control}>
          <label htmlFor="time">Event Time</label>
          <input
            id="time"
            name="time"
            type="time"
            defaultValue={path.includes("new") ? time : params.template.time}
            readOnly={params.readOnly}
            className={params.readOnly ? classes.disabled : ""}
            onChange={(e) => debounceTime(e.target.value)}
          />
        </div>
        <div className={classes.form_control}>
          <label htmlFor="venue">Venue</label>
          <input
            id="venue"
            name="venue"
            type="text"
            defaultValue={path.includes("new") ? venue : params.template.venue}
            readOnly={params.readOnly}
            className={params.readOnly ? classes.disabled : ""}
            onChange={(e) => debounceVenue(e.target.value)}
          />
        </div>
        <div className={classes.form_control}>
          <label htmlFor="address">Address</label>
          <textarea
            cols="1"
            rows="5"
            id="address"
            name="address"
            defaultValue={path.includes("new") ? address : params.template.address}
            readOnly={params.readOnly}
            className={params.readOnly ? classes.disabled : ""}
            onChange={(e) => debounceAddress(e.target.value)}
          />
        </div>
        <button className={classes.btn} onClick={handleImageChange} disabled={path.includes("new") ? false : params.readOnly}>Change Image</button>
        <div className={classes.form_control_map}>
          <button
            className={classes.btn_location}
            type="button"
            onClick={handleMapBtn}
          >
            <span className="material-symbols-outlined">location_on</span>
            {latLng === vars.defaultLocation
              ? "Add Location"
              : `${getGeo().lat}, ${getGeo().lng}`}
          </button>
        </div>
        <div className={classes.form_control}>
          <input id="form" name="form" defaultValue={"F02"} hidden />
          <input
            id="geo"
            name="geo"
            defaultValue={latLng ? `${latLng.lat}, ${latLng.lng}` : ""}
            hidden
          />
          <input
            id="template"
            name="template"
            defaultValue={params.template.template}
            hidden
          />
          <input
            id="default-image"
            name="default-image"
            defaultValue={selectedimg ? selectedimg : params.template.styles.background_image}
            hidden
          />
          <input
            id="template_color"
            name="template_color"
            defaultValue={templateColor}
            hidden
          />
          <input
            id="font_color"
            name="font_color"
            defaultValue={fontColor}
            hidden
          />
          <input id="opacity" name="opacity" defaultValue={opacity} hidden />
          <input
            id="gray_scale"
            name="gray_scale"
            defaultValue={grayScale}
            hidden
          />
          <input
            id="selected_font"
            name="selected_font"
            defaultValue={selectedfont}
            hidden
          />
          <input
            id="font_size"
            name="font_size"
            defaultValue={fontSize}
            hidden
          />
          <div className={classes.form_control_submit}>
            <SubmitContactForm
              label={"Submit"}
              disabled={path.includes("new") ? formIncomplete : params.readOnly}
              class={classes.btn}
            />
          </div>
          <div className={classes.alarm}>
            {state.message != "ok" && <p>{state.message}</p>}
          </div>
        </div>
      </form>
    </>
  );
}
