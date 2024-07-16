import { Dancing_Script } from "next/font/google";
import { Caveat } from "next/font/google";
import classes from "./font-selector.module.css";
import { useSelectedFont } from "@/app/lib/store";
import { useState, useEffect } from "react";

const DansScripts = Dancing_Script({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"] });

export default function FontSelector(props) {
  const [font, setFont] = useState(props.styles.font_family);

  const newSelectedFont = useSelectedFont((state) => state.setNewSelectedFont);

  const handleFontSelect = (e) => {
    setFont(e.target.value);
  };

  useEffect(() => {
    newSelectedFont(font);
  }, [font]);

  return (
    <div className={classes.form_control}>
      <label htmlFor="font_selector">Select Font</label>
      <select
        id="font_selector"
        name="font_selector"
        onChange={handleFontSelect}
      >
        <option>-- Select Font --</option>
        <option className={DansScripts.className}>DansScripts</option>
        <option className={caveat.className}>caveat</option>
      </select>
    </div>
  );
}
