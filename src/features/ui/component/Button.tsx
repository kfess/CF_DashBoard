import * as React from "react";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";

const gray = {
  500: "#E5E5E5",
  600: "#D8D8D8",
  700: "#D8D8D8",
};

const other = {
  100: "#eaeef2",
  300: "#afb8c1",
  900: "#24292f",
};

const CustomButton = styled(ButtonUnstyled)(
  ({ theme }) => `
    background-color: ${gray[500]};
    padding: 0.375rem 0.75rem;
    line-height: 1.25rem;
    border-radius: 6px;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === "dark" ? other[900] : other[100]
    };
    &:hover {
      background-color: ${gray[600]};
    }
    &.${buttonUnstyledClasses.active} {
      background-color: ${gray[700]};
    }
    &.${buttonUnstyledClasses.focusVisible} {
      box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 2px rgba(0, 127, 255, 0.5);
      outline: none;
    }
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
    `
);

type Props = React.ComponentProps<typeof ButtonUnstyled> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export const Button: React.FC<Props> = (props) => {
  const { startIcon, endIcon, ...otherProps } = props;
  return (
    <CustomButton {...otherProps}>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.3rem",
        }}
      >
        {props.startIcon}
        {props.children}
        {props.endIcon}
      </div>
    </CustomButton>
  );
};
