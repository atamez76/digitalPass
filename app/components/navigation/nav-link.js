"use client";

import Link from "next/link";
import classes from "./nav-link.module.css";
import { usePathname } from "next/navigation";
import { useMenuSelectedStore } from "@/app/lib/store";

export function NavLinkExtended(props) {
  const menu = useMenuSelectedStore((state) => state.menu_selected);
  const clearMenu = useMenuSelectedStore((state) => state.clearMenuSelected);
  const path = usePathname();
  return (
    <div className={classes.list_item}>
      <span
        className={
          path.startsWith(props.link)
            ? `${classes.flag} ${classes.active}`
            : classes.flag
        }
      ></span>
      <Link href={props.link} className={classes.link_extended} onClick={clearMenu}>
        {props.name}
      </Link>
    </div>
  );
}

export function NavLinkCollapsed(props) {
  const menu = useMenuSelectedStore((state) => state.menu_selected);
  const clearMenu = useMenuSelectedStore((state) => state.clearMenuSelected);
  const path = usePathname();
  return (
    <div className={classes.list_item}>
      <span
        className={
          path.startsWith(props.link)
            ? `${classes.flag} ${classes.active}`
            : classes.flag
        }
      ></span>
      <Link href={props.link} className={classes.link_collapsed} onClick={clearMenu}>
        <div className={classes.tooltip}>
          {props.icon}
          <span className={classes.tooltiptext}>{props.name}</span>
        </div>
      </Link>
    </div>
  );
}
