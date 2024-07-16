"use client";
import T_01 from "./t-01";
import T_02 from "./t-02";
import { Dancing_Script } from "next/font/google";
import { Caveat } from "next/font/google";
import { useSelectedFont } from "@/app/lib/store";
import { useSearchParams } from "next/navigation";

const DansScripts = Dancing_Script({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"] });

export default function Template({ template }) {
  const seachParams = useSearchParams();
  const firstName = seachParams.get("firstName");
  const lastName = seachParams.get("lastName");
  const selectedFont = useSelectedFont((state) => state.selectedFont);

  const fonts = {
    DansScripts: DansScripts.className,
    caveat: caveat.className,
  };

  switch (true) {
    case template.template === "t_01":
      return (
        <T_01
          data={template}
          selectedFont={
            selectedFont
              ? fonts[selectedFont]
              : fonts[template.styles.font_family]
          }
          firstName={firstName}
          lastName={lastName}
        />
      );
    case template.template === "t_02":
      return (
        <T_02
          data={template}
          selectedFont={
            selectedFont
              ? fonts[selectedFont]
              : fonts[template.styles.font_family]
          }
          firstName={firstName}
          lastName={lastName}
        />
      );
  }
}
