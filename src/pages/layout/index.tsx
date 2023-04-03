import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import type { Field } from "@features/layout/components/SideNavigationItems";
import { HeaderBar } from "@features/layout/components/HeaderBar";
import { SideNavigationBar } from "@features/layout/components/SideNavigationBar";

export const LayoutPage: React.FC = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleSideBar = () => setIsOpenSideBar(!isOpenSideBar);
  const [selectedItem, setSelectedItem] = useState<Field>("Contests");

  return (
    <div>
      <HeaderBar isOpenSideBar={isOpenSideBar} toggleSideBar={toggleSideBar} />
      {isOpenSideBar && (
        <SideNavigationBar
          isOpenSideBar={isOpenSideBar}
          toggleSideBar={toggleSideBar}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
      <Outlet />
    </div>
  );
};
