"use client";

import { useState } from "react";
import classes from "./nav-bar.module.css";
import "../../globalicons.css";
import { NavLinkCollapsed, NavLinkExtended } from "./nav-link";
import { useEffect } from "react";

function ExtendedNav() {
  return (
    <nav>
      <ul className={classes.navlist_extended}>
        <li className={classes.navlink_extended}>
          <NavLinkExtended name={"My Events"} link={"/events"} />
        </li>
        <li className={classes.navlink_extended}>
          <NavLinkExtended name={"Gallery"} link={"/content-store"} />
        </li>
      </ul>
    </nav>
  );
}

function CollapsedNav() {
  return (
    <nav>
      <ul className={classes.navlist_collapsed}>
        <li className={classes.navlink_collapsed}>
          <NavLinkCollapsed
            name={"My Events"}
            link={"/events"}
            icon={<span className="material-symbols-outlined">event</span>}
          />
        </li>
        <li className={classes.navlink_collapsed}>
          <NavLinkCollapsed
            name={"Gallery"}
            link={"/content-store"}
            icon={
              <span className="material-symbols-outlined">
                gallery_thumbnail
              </span>
            }
          />
        </li>
      </ul>
    </nav>
  );
}

export default function NavBar(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    isCollapsed ? setIsCollapsed(false) : setIsCollapsed(true);
  };

  useEffect(() => {
    props.onCollapse(isCollapsed);
  }, [isCollapsed]);

  return (
    <div className={isCollapsed ? classes.collapsed : classes.extended}>
      {!isCollapsed ? (
        <>
          <div className={classes.btn_container}>
            <span
              className="material-symbols-outlined"
              onClick={handleCollapse}
            >
              left_panel_close
            </span>
          </div>
          <ExtendedNav />
        </>
      ) : (
        <>
          <div className={classes.btn_container}>
            <span
              className="material-symbols-outlined"
              onClick={handleCollapse}
            >
              left_panel_open
            </span>
          </div>
          <CollapsedNav />
        </>
      )}
    </div>
  );
}
