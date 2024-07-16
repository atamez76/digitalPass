"use client";
import classes from "./contact_load.module.css";
import ImagePicker from "../invitation-Styles/image-picker/image-picker";
import { useEffect, useState } from "react";
import {
  AddRepositoryObject,
  deleteRepositoryObjects,
} from "@/app/lib/actions";
import { useFormState } from "react-dom";
import SubmitContactForm from "./submit-contact-form";
import { useDebouncedCallback } from "use-debounce";
import Loader from "../ui-elements/loader";

export default function FileUploadForm(props) {
  const [fileSelected, setFileSelected] = useState(false);
  const [folderNameEntered, setFolderNameEntered] = useState(false);
  const [objName, setObjName] = useState(null);
  const [flash, setFlash] = useState(null);
  const [isDeleting, setIsDeliting] = useState(false)

  const handleFileSelected = (state) => {
    setFileSelected(state);
  };

  const handleClose = () => {
    props.onClose(false);
    setObjName(null);
    setFlash(null);
  };

  const [state, formAction] = useFormState(AddRepositoryObject, {
    message: null,
  });

  useEffect(() => {
    if (state.message === "file Uploaded") {
      updateState();
    } else {
      setFlash(state.message);
    }

    props.selectedItems.length > 0 ? setFlash(null) : "";
  }, [state.message, props.selectedItems.length]);

  const updateState = () => {
    props.onSuccessUpload(true);
    props.onClose(false);
    handleClose();
  };

  const debouncedFolderName = useDebouncedCallback((value) => {
    const folderName = value;
    if (folderName) {
      setFolderNameEntered(true);
    } else {
      setFolderNameEntered(false);
    }
  }, 1000);

  const handleFileNameFixed = (state) => {
    setObjName(state);
  };

  const handleDeleteItems = async () => {
    setIsDeliting(true)
    const response = await deleteRepositoryObjects(props.selectedItems);
    if (response) {
      updateState();
      props.onSuccessUpload(true);
      props.onSucessDelete(true);
      setIsDeliting(false)
      handleClose();
    } else {
      handleClose();
      setIsDeliting(false)
    }
  };

  const getForm = () => {
    if (props.objectType === "file") {
      return (
        <form action={formAction}>
          <ImagePicker
            id="newImageFile"
            name="newImageFile"
            input_name={"file_input"}
            onFileSelected={handleFileSelected}
            onfileNamefixed={handleFileNameFixed}
          />
          {fileSelected && (
            <div className={classes.control}>
              <SubmitContactForm class={classes.btn_3} label={"Upload"} />
            </div>
          )}
          <input
            id="prefix"
            name="prefix"
            defaultValue={props.prefix ? props.prefix : ""}
            hidden
          />
          <input
            id="object_type"
            name="object_type"
            defaultValue={props.objectType}
            hidden
          />
          <input
            id="object_name"
            name="object_name"
            defaultValue={objName}
            hidden
          />
        </form>
      );
    } else if (props.objectType === "folder") {
      return (
        <form action={formAction}>
          <div className={classes.control}>
            <span className="material-symbols-outlined">folder</span>
            <input
              placeholder="Folder Name"
              id="folderName"
              name="folderName"
              onChange={(e) => debouncedFolderName(e.target.value)}
            />
          </div>
          {folderNameEntered && (
            <SubmitContactForm class={classes.btn_3} label={"Save"} />
          )}
          <input
            id="prefix"
            name="prefix"
            defaultValue={props.prefix ? props.prefix : ""}
            hidden
          />
          <input
            id="object_type"
            name="object_type"
            defaultValue={props.objectType}
            hidden
          />
        </form>
      );
    } else if (props.objectType === "delete") {
      return (
        <div className={classes.form_container}>
          <h4>Delete selected {props.selectedItems.length} Items</h4>
          <button className={classes.btn_2} onClick={handleDeleteItems} disabled={isDeleting}>
            { isDeleting ? <Loader /> : "Confirm" }
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <div className={classes.controls_rigth_aligned}>
        <span className="material-symbols-outlined" onClick={handleClose}>
          close
        </span>
      </div>
      <div className={classes.form_container}>
        {getForm()}
        {flash && flash}
      </div>
    </>
  );
}
