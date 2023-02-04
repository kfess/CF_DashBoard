import React from "react";
import { NavLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const splitPath = (path: string): { to: string; name: string }[] =>
  path
    .slice(0, path.indexOf("?"))
    .split("/")
    .map((p, index) => {
      if (index === 0) {
        return { to: "/", name: "home" };
      } else {
        return {
          to: path
            .split("/")
            .slice(0, index + 1)
            .join("/"),
          name: p,
        };
      }
    });

type Props = {
  path: string;
};

export const CustomBreadcrumbs: React.FC<Props> = (props: Props) => {
  const { path } = props;
  const paths = splitPath(path);

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      {paths.map((p) => (
        <NavLink color="inherit" to={p.to}>
          {p.name}
        </NavLink>
      ))}
    </Breadcrumbs>
  );
};
