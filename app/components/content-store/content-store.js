"use client";
import "../../globals.css";
import Image from "next/image";
import { vars } from "@/app/lib/vars";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ListRepositoryObjects } from "@/app/lib/actions";
import FileUploadForm from "../forms/file-upload";
import { useImage } from "@/app/lib/store";

export default function ContentStore() {
  const [drillContent, setDrillContent] = useState([]);
  const [folders, setFolders] = useState([]);
  const [Prefix, setPrefix] = useState(null);
  const [breadCrumb, setBreadCrumb] = useState(["/"]);
  const [isAdding, setIsAdding] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [objectType, setObjectType] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const imgSelected = useImage((state) => state.setNewImg);
  const setSelectingImage = useImage((state) => state.setIsSelectingImage);
  const isSelectingImage = useImage((state) => state.isSelectingImage);

  useEffect(() => {
    const getContent = async () => {
      const objects = await ListRepositoryObjects(Prefix);
      const filteredContent = objects.Contents.filter(
        (item) => item.Key != Prefix
      );
      setDrillContent(filteredContent);
      setFolders(objects.CommonPrefixes);
    };

    if (Prefix === null || Prefix || fileUploaded) {
      getContent();
    }
  }, [Prefix, fileUploaded]);

  const drillTrough = (e) => {
    e.preventDefault();
    const nav = e.currentTarget.parentNode.parentNode.lastChild.innerHTML;
    setPrefix(e.currentTarget.parentNode.parentNode.lastChild.innerHTML);
    setBreadCrumb([...breadCrumb, nav]);
    fileUploaded ? setFileUploaded(false) : "";
  };

  const goHome = (e) => {
    e.preventDefault();
    setPrefix(null);
    setBreadCrumb(["/"]);
    fileUploaded ? setFileUploaded(false) : "";
  };

  const goBack = async (e) => {
    e.preventDefault();
    if (breadCrumb[breadCrumb.indexOf(Prefix) - 1] === "/") {
      setPrefix(null);
      setBreadCrumb(["/"]);
    } else {
      setPrefix(breadCrumb[breadCrumb.indexOf(Prefix) - 1]);
    }
    fileUploaded ? setFileUploaded(false) : "";
  };

  const handleAddFile = () => {
    isAdding ? setIsAdding(false) : setIsAdding(true);
    setObjectType("file");
  };

  const handleAddFolder = () => {
    isAdding ? setIsAdding(false) : setIsAdding(true);
    setObjectType("folder");
  };

  const handleClose = (state) => {
    setIsAdding(state);
    setObjectType(null);
    fileUploaded ? setFileUploaded(false) : "";
  };

  const handleSucessUpload = (state) => {
    setFileUploaded(state);
    setObjectType(null);
  };

  const handleSelect = (e) => {
    if (e.currentTarget.checked) {
      setSelectedItems([
        ...selectedItems,
        { Key: e.currentTarget.parentNode.parentNode.lastChild.innerHTML },
      ]);
    } else {
      const filtered_items = selectedItems.filter(
        (item) =>
          item.Key != e.currentTarget.parentNode.parentNode.lastChild.innerHTML
      );
      setSelectedItems(filtered_items);
    }
  };

  const handleDelete = (e) => {
    isAdding ? setIsAdding(false) : setIsAdding(true);
    setObjectType("delete");
  };

  const handleSucessDelete = (state) => {
    if (state) {
      setSelectedItems([]);
    }
  };

  const handleSelectedObject = (e) => {
    imgSelected(
      `${vars.AWSBuketURL}${e.currentTarget.parentNode.parentNode.lastChild.innerHTML}`
    );
    setSelectingImage(false);
  };

  return (
    <div className="page_body">
      <div className="table_container">
        <div className={"controls_rigth_aligned"}>
          <span className="material-symbols-outlined" onClick={goHome}>
            home
          </span>
          <span className="material-symbols-outlined" onClick={goBack}>
            undo
          </span>
          <span className="material-symbols-outlined" onClick={handleAddFile}>
            add
          </span>
          <span className="material-symbols-outlined" onClick={handleAddFolder}>
            create_new_folder
          </span>
          <span className="material-symbols-outlined" onClick={handleDelete}>
            delete
          </span>
        </div>
        {isAdding && (
          <div className="collapsable_section">
            <FileUploadForm
              onClose={handleClose}
              prefix={Prefix}
              onSuccessUpload={handleSucessUpload}
              objectType={objectType}
              selectedItems={selectedItems}
              onSucessDelete={handleSucessDelete}
            />
          </div>
        )}
        <table className="table">
          <thead className="table_header">
            <tr>
              <th></th>
              <th style={{ width: "30%" }}>Name</th>
              <th>Date</th>
              <th>Size</th>
              <th>Type</th>
              <th>preview</th>
              <th></th>
              <th hidden></th>
            </tr>
          </thead>
          <tbody>
            {folders ? (
              folders.map((object) => (
                <tr key={object.Prefix}>
                  <td>
                    <input type="checkbox" onChange={handleSelect} />
                  </td>
                  <td>
                    <div className="content_display" onClick={drillTrough}>
                      <span className="material-symbols-outlined">folder</span>
                      <h4>{object.Prefix}</h4>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td>{"Folder"}</td>
                  <td></td>
                  <td></td>
                  <td hidden>{object.Prefix}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td></td>
              </tr>
            )}
          </tbody>
          <tbody>
            {drillContent ? (
              drillContent.map((object) => (
                <tr key={object.Key}>
                  <td>
                    <input type="checkbox" onChange={handleSelect} />
                  </td>
                  <td>
                    <div className="content_display">
                      <Image
                        src={`${vars.AWSBuketURL}${object.Key}`}
                        height={100}
                        width={100}
                        alt={object.Key}
                      />
                      <h4>
                        {object.Key.substring(object.Key.lastIndexOf("/") + 1)
                          ? object.Key.substring(
                              object.Key.lastIndexOf("/") + 1
                            )
                          : object.Key}
                      </h4>
                    </div>
                  </td>
                  <td>{object.LastModified.toDateString()}</td>
                  <td>{`${(object.Size / 1000).toFixed(2)} KB`}</td>
                  <td>{object.Key.split(".").pop()}</td>
                  <td>
                    {
                      <Link
                        target="_blank"
                        href={`${vars.AWSBuketURL}${object.Key}`}
                      >
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </Link>
                    }
                  </td>
                  <td>
                    <button className="btn" onClick={handleSelectedObject}
                    hidden={!isSelectingImage}>
                      Insert
                    </button>
                  </td>
                  <td hidden>{object.Key}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
