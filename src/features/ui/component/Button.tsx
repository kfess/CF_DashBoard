import { Button as MUIButton } from "@mui/material";
import { ButtonProps as MUIButtonProps } from "@mui/material/Button";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface ButtonProps extends MUIButtonProps {
  sx?: SxProps<Theme>;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <MUIButton
      color="info"
      variant={props.variant || "contained"}
      size={props.size || "medium"}
      disableElevation
      disableRipple
      sx={{
        textTransform: "none",
        whiteSpace: "nowrap",
      }}
      {...props}
    />
  );
};
