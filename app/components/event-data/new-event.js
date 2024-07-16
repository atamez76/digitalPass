"use client";
import "../../globals.css";
import classes from "./new-event.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "../invitations/invitation-forms/form";
import Template from "../invitations/invitation-templates/template";
import Map from "../maps/map";
import ColorPicker from "../invitation-Styles/color-picker/color-picker";
import FontSelector from "../invitation-Styles/font-Selector/font-selector";
import FontColorPicker from "../invitation-Styles/font-color-picker/font-color-picker";
import ImageFilters from "../invitation-Styles/filter-selectors/filter-selectors";
import FontSizeSelector from "../invitation-Styles/font-size-selector/font-size-selector";
import { useFormDataStore, useImage } from "@/app/lib/store";
import { vars } from "@/app/lib/vars";
import ContentStore from "../content-store/content-store";
import Link from "next/link";

export default function NewEventData(params) {
  const path = usePathname();
  const [mapVisible, setMapVisible] = useState(false);
  const [eventLocation, setEventLocation] = useState(vars.defaultLocation);
  const [readOnly, setReadOnly] = useState(true);

  const isSelectingImage = useImage((state) => state.setIsSelectingImage);
  const selectingImage = useImage((state) => state.isSelectingImage);

  const handleMapVisible = (state, latLng) => {
    setEventLocation(latLng);
    setMapVisible(state);
  };

  const NewlatLng = useFormDataStore((state) => state.setNewLatLng);

  const handleMapClose = (state) => {
    setMapVisible(state);
  };

  const handleSelectingImage = () => {
    isSelectingImage(false);
  };

  useEffect(() => {
    if (path.includes("new")) {
      setReadOnly(false);
    }
    if (params.template.geo) {
      const latLngArray = params.template.geo.split(",");
      const coordinates = {};
      coordinates.lat = parseFloat(latLngArray[0]);
      coordinates.lng = parseFloat(latLngArray[1]);
      NewlatLng(coordinates);
    } else {
      NewlatLng(eventLocation);
    }
  }, [eventLocation]);

  return (
    <>
      {path.includes("new") && (
        <div className="page_header">
          <div className="titles">
            <h1>New Event</h1>
          </div>
          {!selectingImage &&
            <Link className="back" href="/events">
              <span className="material-symbols-outlined">arrow_back_ios</span>
              <span>Back</span>
            </Link>
          }
          {selectingImage && (
            <span
              className="material-symbols-outlined Fill"
              onClick={handleSelectingImage}
            >
              cancel
            </span>
          )}
        </div>
      )}
      {selectingImage === true ? (
        <ContentStore />
      ) : (
        <div className={classes.new_event_wrapper}>
          <div className={classes.form_map_holder}>
            <div className={classes.form_holder}>
              <Form
                template={params.template}
                eventList={params.eventList}
                onMapVisible={handleMapVisible}
                readOnly={readOnly}
              />
            </div>
            <div
              className={
                mapVisible === true
                  ? `${classes.map_holder} ${classes.visible}`
                  : classes.map_holder
              }
            >
              <Map onMapClose={handleMapClose} />
            </div>
          </div>
          <div className={classes.pass_holder}>
            <div className={classes.pass}>
              <Template template={params.template} />
            </div>
          </div>
          <div className={classes.property_holder}>
            <h3>Invitation style</h3>
            <ColorPicker styles={params.template} />
            <FontSelector styles={params.template} />
            <FontColorPicker styles={params.template} />
            <ImageFilters styles={params.template.styles} />
            <FontSizeSelector styles={params.template} />
          </div>
          {mapVisible && <div className={classes.overlay} />}
        </div>
      )}
    </>
  );
}
