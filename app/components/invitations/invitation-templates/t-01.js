import classes from "./invitation-template.module.css";
import { Dancing_Script } from "next/font/google";
import {
  useTemplateColor,
  useFormDataStore,
  useFontColor,
  useImageFilters,
  useFontSize,
  useImage,
} from "@/app/lib/store";

const DansScripts = Dancing_Script({ subsets: ["latin"] });

export default function T_01(props) {
  const backgroundColor = props.data.styles.background_color;
  const font_color = props.data.styles.font_color;
  const opacity = props.data.styles.opacity;
  const grayScale = props.data.styles.grayscale;
  const fontSize = props.data.styles.font_size;
  const backGroundImage = props.data.styles.background_image;

  const guestName = (props.firstName !=null && props.lastName != null) ? `${props.firstName} ${props.lastName}`: null

  const NewbackgroundColor = useTemplateColor((state) => state.templateColor);
  const NewFontColor = useFontColor((state) => state.FontColor);
  const NewOpacity = useImageFilters((state) => state.Opacity);
  const NewGrayScale = useImageFilters((state) => state.GrayScale);
  const NewFontSize = useFontSize((state) => state.fontSize);
  const newImageFile = useImage((state) => state.img);
  const newBackgroundImage = newImageFile


  const title = useFormDataStore((state) => state.title);
  const description = useFormDataStore((state) => state.description);
  const date = useFormDataStore((state) => state.date);
  const time = useFormDataStore((state) => state.time);
  const venue = useFormDataStore((state) => state.venue);
  const address = useFormDataStore((state) => state.address);

  return (
    <>
      <div
        className={classes.pass_image}
        style={{
          backgroundImage: newBackgroundImage ? `url(${newBackgroundImage})` : `url(${backGroundImage})`,
          opacity: NewOpacity ? NewOpacity : opacity,
          filter: NewGrayScale
            ? `grayscale(${NewGrayScale})`
            : `grayscale(${grayScale})`,
        }}
      ></div>
      <div
        className={`${classes.pass_data} ${
          props.selectedFont ? props.selectedFont : DansScripts.className
        }`}
        style={{
          background: `${
            NewbackgroundColor ? NewbackgroundColor : backgroundColor
          }`,
          color: `${NewFontColor ? NewFontColor : font_color}`,
          fontSize: `${NewFontSize ? NewFontSize : fontSize}`,
        }}
      >
        <div className={classes.control}>
          <p>{guestName != null ? guestName : props.data.guess_name}</p>
        </div>
        <div className={classes.control}>
          <h2>{title ? title : props.data.title}</h2>
        </div>
        <div className={`${classes.control} ${classes.text_center}`}>
          <p>{description ? description : props.data.description}</p>
        </div>
        <div className={classes.row}>
          <div className={classes.control}>
            <p>{date ? date : props.data.date}</p>
          </div>
          <div className={classes.control}>
            <p>{time ? time : props.data.time}</p>
          </div>
        </div>
        <div className={classes.control}>
          <p>{venue ? venue : props.data.venue}</p>
        </div>
        <div className={`${classes.control} ${classes.text_center}`}>
          <p>{address ? address : props.data.address}</p>
        </div>
      </div>
    </>
  );
}
