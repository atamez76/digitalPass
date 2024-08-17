"use client";

import { useImage } from "@/app/lib/store";
import Image from "next/image";

export default function PickFromGallery() {
  const isSelectingImage = useImage((state) => state.setIsSelectingImage);
  const selectingImage = useImage((state) => state.isSelectingImage);
  const image = useImage((state) => state.img);
  console.log(image)

  return (
    <>
      <button
        onClick={() => {
          isSelectingImage(!selectingImage);
        }}
      >
        Pick from Gallery
      </button>
      {image && <Image src={image} height={100} width={100} alt="image" /> }
    </>
  );
}
