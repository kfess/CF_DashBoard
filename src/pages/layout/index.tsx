import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { Field } from "@features/layout/components/SideNavigationItems";
import { HeaderBar } from "@features/layout/components/HeaderBar";
import { SideNavigationBar } from "@features/layout/components/SideNavigationBar";
import { pageMetaInfoMap } from "@helpers/pageMetaInfoMap";
import { Footer } from "@features/layout/components/Footer";

export const LayoutPage: React.FC = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleSideBar = () => setIsOpenSideBar(!isOpenSideBar);
  const [selectedItem, setSelectedItem] = useState<Field>("Contests");

  const location = useLocation();
  const path = location.pathname;
  const metaInfo = pageMetaInfoMap[path] ?? pageMetaInfoMap["default"];

  return (
    <>
      <Helmet>
        <title>{metaInfo.title}</title>
        <meta name="description" content={metaInfo.description} />
      </Helmet>
      <HeaderBar
        isOpenSideBar={isOpenSideBar}
        toggleSideBar={toggleSideBar}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      {isOpenSideBar && (
        <SideNavigationBar
          isOpenSideBar={isOpenSideBar}
          toggleSideBar={toggleSideBar}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
