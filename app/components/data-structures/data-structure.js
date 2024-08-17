"use client";
import { useImage } from "@/app/lib/store";
import Fields from "../ui-elements/field";
import ContentStore from "../content-store/content-store";
import Link from "next/link";

export default function DataStructure(props) {
  const isSelectingImage = useImage((state) => state.setIsSelectingImage);
  const selectingImage = useImage((state) => state.isSelectingImage);
  const data = props.data;
  
  return (
    <>
      <div className="page_header">
        <h1>Create Templates Here</h1>
        {!selectingImage && (
          <Link className="back" href="/">
            <span className="material-symbols-outlined">arrow_back_ios</span>
            <span>Back</span>
          </Link>
        )}
        {selectingImage && (
          <span
            className="material-symbols-outlined Fill"
            onClick={() => isSelectingImage(false)}
          >
            cancel
          </span>
        )}
      </div>
      {selectingImage === true ? (
        <ContentStore />
      ) : (
        <div className="main-page-wrapper">
          <div className="data_structure">
            {data.map((x) => (
              <Fields
                key={data.indexOf(x)}
                fieldType={x.field.fieldType}
                label={x.field.label}
                id={x.field.id}
                name={x.field.name}
                type={x.field.type}
                required={x.field.required}
                accept={x.field.accept}
                cols={x.field.cols}
                rows={x.field.rows}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
