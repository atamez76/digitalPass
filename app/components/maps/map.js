"use client";
import classes from "./map.module.css";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useFormDataStore } from "@/app/lib/store";

export default function Map(props) {
  const mapRef = useRef(null);
  const [location, setLocation] = useState({
    lat: 25.681867061578398,
    lng: -100.33832585087677,
  });

  const latLng = useFormDataStore((state) => state.latLng)

  
  const NewlatLng = useFormDataStore((state) => state.setNewLatLng);
  
  useEffect(() => {
    
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const { AdvancedMarkerElement } = await loader.importLibrary("marker");

      const position = latLng ? latLng : location;
      

      const mapOptions = {
        center: position,
        zoom: 17,
        mapId: "NextJSMapId",
      };

      const map = new Map(mapRef.current, mapOptions);

      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        gmpDraggable: false,
        title: String(`${position.lat},${position.lng}`),
      });

      map.addListener("click", (event) => {
        const loc = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        marker.position = loc;
        marker.title = String(`${loc.lat},${loc.lng}`);
        setLocation(loc);
       
      });
    };

    initMap();
  }, [latLng]);

  

  useEffect(() => {
    NewlatLng(location);
  }, [location]);

  const handleClose = (e) => {
    e.preventDefault();
    props.onMapClose(false);
  };

  return (
    <div className={classes.map_wrapper}>
      <div className={classes.map_view} ref={mapRef} />;
      <button className={classes.btn} onClick={handleClose}>
        Close
      </button>
    </div>
  );
}
