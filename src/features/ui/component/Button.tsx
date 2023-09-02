import * as React from "react";
import ButtonUnstyled, {
  buttonUnstyledClasses,
  ButtonUnstyledProps,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import { darken } from "@mui/material";
import { isDarkish } from "@features/color/utils";

const gray = {
  500: "#E5E5E5",
  600: "#D8D8D8",
  700: "#D8D8D8",
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

const sizeStyles = {
  small: `
    padding: 0.125rem 0.25rem;
    font-size: 0.75rem;
    line-height: 0.875rem;
  `,
  medium: `
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1rem;
  `,
  large: `
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.25rem;
  `,
};
const CustomButtonRoot = styled(ButtonUnstyled)<ButtonProps>(
  ({ theme, color, size = "medium" }) => `
    ${sizeStyles[size]}
    background-color: ${color ? darken(color, 0.1) : "#E5E5E5"};
    padding: 0.375rem 0.75rem;
    line-height: 1.25rem;
    border-radius: 6px;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;
    color: ${color ? (isDarkish(color) ? "#FFFFFF" : "#000000") : "#000000"};
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === "dark" ? "#24292f" : "#eaeef2"
    };
    &:hover {
      background-color: ${color ? darken(color, 0.2) : "#D8D8D8"};
    }
    &.${buttonUnstyledClasses.active} {
      background-color: ${color ? darken(color, 0.2) : "#D8D8D8"};
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

type ButtonProps = ButtonUnstyledProps & {
  color?: string;
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export const _Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    return <CustomButtonRoot ref={ref} {...props} />;
  }
);

_Button.displayName = "_Button";
