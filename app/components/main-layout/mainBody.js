"use client";
import "../../globals.css";
import NavBar from "../navigation/nav-bar";
import MainLayOut from "./mainLayout";
import { useEffect, useState } from "react";
import { useMenuSelectedStore } from "@/app/lib/store";

export default function MainBody({ children }) {
  const [navCollapsed, setNavCollapsed] = useState(null);
  const clearMenu = useMenuSelectedStore((state) => state.clearMenuSelected);

  const handleCollapse = (state) =>{
    setNavCollapsed(state)
  }

  const handleclick = () =>{
    clearMenu();
  }

  useEffect(()=>{
    document.body.addEventListener('click', handleclick);
    return () => {
      document.body.removeEventListener('click', handleclick);
    }
  },[])
  
  return (
    <div className={!navCollapsed ? "main-wrapper-extended": "main-wrapper-collapsed"}>
      <NavBar onCollapse = {handleCollapse} />
      <MainLayOut children={children} />
    </div>
  );
}
