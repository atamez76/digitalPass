"use client";
import FileLoader from "../file-loader/file-Loader";
import Link from "next/link";
import ActionButton from "../forms/action_button";
import { useState, useEffect } from "react";
import NewContactForm from "../forms/new_contact_form";
import Flash from "../ui-elements/flash-message";
import { useConfirmation, UseMessage } from "@/app/lib/store";
import BulkSend from "../forms/bulk_send";

export default function Contacts(props) {
  const [contactformVisible, setContactFormVisible] = useState(false);
  const [bulkSendVisible, setBulkSendVisible] = useState(false);
  const [flash, setFlash] = useState(false);
  const NewConfirmation = useConfirmation((state) => state.confirmation);
  const setNewMessage = UseMessage((state) => state.setMessage);
  const clearMessage = UseMessage((state) => state.clearMessage);
  

  const newMessage = UseMessage((state) => state.message);

  useEffect (()=>{
    if(newMessage){
      setFlash(true)
    }
  }, [newMessage])

  const handleContactformVisible = (state) => {
    setContactFormVisible(!state);
  };

  const handleBulkSendVisible = (state) => {
    setBulkSendVisible(!state)
  }

  const clearFlash = () => {
    setFlash(false);
    clearMessage();
  };

  if (flash === true) {
    setTimeout(() => clearFlash(), 5000);
  }

  const handleResponse = (message) => {
    setFlash(true);
    setNewMessage(message);
  };

  const handleSendCompletion = (state) =>{
    setBulkSendVisible(state)
  }

  return (
    <>
      {Object.keys(NewConfirmation).length === 0 && (
        <div className="buttons_holder">
          <ActionButton onClicked={handleBulkSendVisible} label={"Bulk Send"} />
          <ActionButton
            onClicked={handleContactformVisible}
            label={"Add Contact"}
          />
          <FileLoader
            event={props.event}
            slug={props.slug}
            onLoadData={handleResponse}
          />
          <Link
            download
            href="https://digipass-main.s3.amazonaws.com/contact_template.csv"
          >
            <div className="tooltip">
              <span className="material-symbols-outlined">download</span>
              <span className="tooltiptext">download template</span>
            </div>
          </Link>
        </div>
      )}
      {flash && <Flash message={newMessage} />}
      {contactformVisible && (
        <NewContactForm
          slug={props.slug}
          event={props.event}
          onformVisible={handleContactformVisible}
        />
      )}
       {bulkSendVisible && (
        <BulkSend slug={props.slug} onSendCompletion={handleSendCompletion}/>
      )}
    </>
  );
}
