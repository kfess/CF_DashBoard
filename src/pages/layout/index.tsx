import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import type { Field } from "@features/layout/components/SideNavigationItems";
import { HeaderBar } from "@features/layout/components/HeaderBar";
import { SideNavigationBar } from "@features/layout/components/SideNavigationBar";
import { isMainField } from "@features/layout/helper";
import { SearchBar } from "@features/layout/components/Search";
import { CustomBreadcrumbs } from "@features/ui/component/BreadCrumbs";

export const LayoutPage: React.FC = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleSideBar = () => setIsOpenSideBar(!isOpenSideBar);
  const [selectedItem, setSelectedItem] = useState<Field>("Contests");

  const { pathname } = useLocation();

  return (
    <>
      <HeaderBar isOpenSideBar={isOpenSideBar} toggleSideBar={toggleSideBar} />
      {isOpenSideBar && (
        <SideNavigationBar
          isOpenSideBar={isOpenSideBar}
          toggleSideBar={toggleSideBar}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
      <CustomBreadcrumbs path={pathname} />
      {isMainField(pathname) && <SearchBar />}
      <Outlet />
    </>
  );
};
