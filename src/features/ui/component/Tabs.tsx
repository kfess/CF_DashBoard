import React, { ReactNode, useState, useEffect } from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

const Tab = styled(TabUnstyled)`
  font-size: 0.875rem;
  font-weight: 500;
  background-color: transparent;
  cursor: pointer;
  margin: 6px 6px;
  border: none;
  border-radius: 6px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #e9edf1;
  }

  &:focus {
    outline: 2px solid #80bfff;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #e9edf1;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  margin-bottom: 16px;
  display: flex;
  position: relative;
`;

const TabIndicator = styled("div")`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: #fe9600;
  transition: left 0s;
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
          <Tab key={index} disabled={item.disabled}>
            {item.label}
          </Tab>
        ))}
        <TabIndicator css={indicatorStyle} />
      </TabsList>
      {tabItems.map((item, index) => (
        <TabPanel value={index}>{item.children}</TabPanel>
      ))}
    </TabsUnstyled>
  );
};
