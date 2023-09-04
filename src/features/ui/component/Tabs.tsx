import React, { ReactNode, useState, useEffect } from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const Tab = styled(TabUnstyled)`
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
  color: #7241b9;
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  margin: 6px 0px;
  border: none;
  border-radius: 6px;
  display: flex;
  justify-content: center;

  &:hover {
    color: #fff; // ホバー時の文字色を白に設定
    background-color: ${({ disabled }) =>
      disabled ? "transparent" : "#A165FF"};
  }

  &:focus {
    outline: 2px solid #e9edf1;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    pointer-events: none;
  }

  &.${tabUnstyledClasses.selected} {
    color: #fff; // 選択時の文字色を白に設定
    background-color: #9246ff; // 選択時の背景色を基調色に設定
  }

  &.${buttonUnstyledClasses.disabled} {
    color: #524296; // 無効時の文字色をさらに暗いパープルに設定
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  margin-bottom: 16px;
  display: flex;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none; // Hide scrollbar for IE and Edge
  &::-webkit-scrollbar {
    display: none; // Hide scrollbar for Chrome, Safari and Opera
  }
`;

const TabIndicator = styled("div")`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: #9246ff; // インジケータの色を基調色に設定
  // transition: left 0s;
  transition: left 0s, width 0s; // width の transition を追加
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

export type TabItem = {
  label: string;
  children: ReactNode;
  disabled: boolean;
};

type Props = { tabItems: TabItem[] };

export const Tabs: React.FC<Props> = ({ tabItems }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // タブインジケータの位置と幅を管理するステートを追加
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: "0px",
    width: "0px",
  });

  useEffect(() => {
    // 初期タブのDOM要素を取得
    const initialTab = document.querySelector(
      `.${tabUnstyledClasses.root}:nth-child(${selectedTabIndex + 1})`
    ) as HTMLElement;

    if (initialTab) {
      // インジケータの初期位置と幅を設定
      setIndicatorStyle({
        left: `${initialTab.offsetLeft}px`,
        width: `${initialTab.offsetWidth}px`,
      });
    }
  }, []);

  const handleTabChange = (
    event: React.SyntheticEvent,
    value: string | number | boolean
  ) => {
    setSelectedTabIndex(value as number);

    const target = event.target as HTMLElement;
    setIndicatorStyle({
      left: `${target.offsetLeft}px`,
      width: `${target.offsetWidth}px`,
    });
  };

  return (
    <TabsUnstyled defaultValue={0} onChange={handleTabChange}>
      <TabsList>
        {tabItems.map((item, index) => (
          <Tab key={item.label} disabled={item.disabled}>
            {item.label}
          </Tab>
        ))}
        <TabIndicator css={indicatorStyle} />
      </TabsList>
      {tabItems.map((item, index) => (
        <TabPanel key={item.label} value={index}>
          {item.children}
        </TabPanel>
      ))}
    </TabsUnstyled>
  );
};

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel_ = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
