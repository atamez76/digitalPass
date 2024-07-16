"use client";

import MenuItem from "./menu-item";
import classes from "./user.module.css";
import { useMenuSelectedStore } from "@/app/lib/store";

export default function User({ user }) {
  const menu = useMenuSelectedStore((state) => state.menu_selected);

  const selectUser = useMenuSelectedStore((state) => state.selectUser);
  const clearMenu = useMenuSelectedStore((state) => state.clearMenuSelected);

  return (
    <>
      <div className={classes.user_settings_wrapper}>
        <button
          onClick={menu === "" || menu === "account" ? selectUser : clearMenu}
          className={classes.user_settings}
        >
          {user}
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </button>
      </div>
      <div className={classes.user_menu}>
        <ul>
          {menu === "user" && (
            <>
              <MenuItem value={"settings"} link={"/user-settings"} />
              <MenuItem value={"Logout"} link={""} />
            </>
          )}
        </ul>
      </div>
    </>
  );
}
