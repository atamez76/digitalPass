'use client'

import classes from "./menu-item.module.css"
import Link from "next/link";
import { useMenuSelectedStore } from "@/app/lib/store";

export default function MenuItem ({value, link}) {
    const menu = useMenuSelectedStore((state) => state.menu_selected);
    const clearMenu = useMenuSelectedStore((state) => state.clearMenuSelected);
  return (
    <div className={classes.menu_item}>
      <li><Link href={link} onClick={clearMenu}>{value}</Link></li>
    </div>
  );
}
