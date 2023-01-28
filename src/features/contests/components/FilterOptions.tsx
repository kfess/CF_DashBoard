import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { Classification } from "@features/contests/contest";
import { classification } from "@features/contests/contest";

const buttonsCss = css({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
});

type Props = {
  tab: Classification;
  setTab: Dispatch<SetStateAction<Classification>>;
  reverse: boolean;
  toggleOrder: (arg: boolean) => void;
};

export const FilterOptions: React.FC<Props> = (props: Props) => {
  const { tab, setTab, reverse, toggleOrder } = props;

  return (
    <>
      <div css={buttonsCss}>
        <ContestTypeFilter tab={tab} setTab={setTab} />
        <PeriodFilter />
        <SolvedStatusFilter />
      </div>
      <div css={buttonsCss}>
        <ShowDifficltySwitch />
        <ShowACStatusSwitch />
        <PinTableHeaderSwitch />
        <OrderSwitch reverse={reverse} toggleOrder={toggleOrder} />
      </div>
    </>
  );
};

const ContestTypeFilter: React.FC<Pick<Props, "tab" | "setTab">> = ({
  tab,
  setTab,
}: Pick<Props, "tab" | "setTab">) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="contest-type-filter-button"
        variant="contained"
        disableElevation
        color="inherit"
        onClick={handleClick}
        css={{ marginRight: "10px" }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Contest Type: {tab}
      </Button>
      <Menu
        id="contest-type-filter-menu"
        MenuListProps={{
          "aria-labelledby": "contest-type-filter-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {classification.map((c) => (
          <MenuItem onClick={() => setTab(c)} disableRipple>
            {c}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const PeriodFilter: React.FC = () => {
  return (
    <Button
      variant="contained"
      disableElevation
      color="inherit"
      css={{ marginRight: "10px" }}
      endIcon={<KeyboardArrowDownIcon />}
    >
      Period
    </Button>
  );
};

const SolvedStatusFilter: React.FC = () => {
  return (
    <Button
      variant="contained"
      disableElevation
      color="inherit"
      css={{ marginRight: "10px" }}
      endIcon={<KeyboardArrowDownIcon />}
    >
      Solved Status
    </Button>
  );
};

const ShowDifficltySwitch: React.FC = () => {
  return (
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="Show Difficulty"
    />
  );
};

const ShowACStatusSwitch: React.FC = () => {
  return (
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="Show AC Status"
    />
  );
};

const PinTableHeaderSwitch: React.FC = () => {
  return (
    <FormControlLabel
      control={<Switch defaultChecked={false} />}
      label="Pin Table Header"
    />
  );
};

const OrderSwitch: React.FC<Pick<Props, "reverse" | "toggleOrder">> = (
  props: Pick<Props, "reverse" | "toggleOrder">
) => {
  const { reverse, toggleOrder } = props;

  return (
    <FormControlLabel
      control={<Switch defaultChecked={false} />}
      label="Reverse Order"
      onChange={() => toggleOrder(!reverse)}
    />
  );
};
