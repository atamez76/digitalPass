"use client";

import MenuItem from "./menu-item";
import classes from "./account.module.css";
import { useMenuSelectedStore } from "@/app/lib/store";

export default function Account({ account }) {
  const menu = useMenuSelectedStore((state) => state.menu_selected);

  const selectAccount = useMenuSelectedStore((state) => state.selectAccount);
  const clearMenu = useMenuSelectedStore((state) => state.clearMenuSelected);

  return (
    <>
      <div>
        <button
          onClick={menu === "" || menu === "user" ? selectAccount : clearMenu}
          className={classes.account_settings}
        >
          {account}
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </button>
      </div>
      <div className={classes.account_menu}>
        <ul>
          {menu === "account" && (
            <>
              <MenuItem value={"Account Settings"} link={"/account-settings"} />
              <MenuItem value={"Billing"} link={"/billing"} />
            </>
          )}
        </ul>
      </div>
    </>
  );
}
