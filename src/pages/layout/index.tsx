import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { Field } from "@features/layout/components/SideNavigationItems";
import { getFieldFromLink } from "@features/layout/components/SideNavigationItems";
import { HeaderBar } from "@features/layout/components/HeaderBar";
import { SideNavigationBar } from "@features/layout/components/SideNavigationBar";
import { pageMetaInfoMap } from "@helpers/pageMetaInfoMap";
import { Footer } from "@features/layout/components/Footer";
import { useToggle } from "@hooks/useToggle";

export const LayoutPage: React.FC = () => {
  const [isOpenSideBar, toggleSideBar] = useToggle(false, true);

  const location = useLocation();
  const path = location.pathname;
  const [selectedItem, setSelectedItem] = useState(
    (getFieldFromLink(path) as Field) || "Contests"
  );

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
          minHeight: "150vh",
        }}
      >
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
