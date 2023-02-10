import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderBar } from "@features/layout/components/HeaderBar";

export const LayoutPage: React.FC = () => {
  return (
    <>
      <HeaderBar />
      <Outlet />
    </>
  );
};
