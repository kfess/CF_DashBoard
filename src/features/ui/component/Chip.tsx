// import React, { ReactElement, ReactNode } from "react";
// import { Chip as MuiChip } from "@mui/material";

// type Props = {
//   readonly label: ReactNode;
//   readonly icon?: ReactElement;
//   onClick?: React.MouseEventHandler<HTMLDivElement>;
// };

// export const Chip_: React.FC<Props> = ({ label, icon, onClick }) => {
//   return (
//     <MuiChip
//       label={label}
//       onClick={onClick ? onClick : () => {}}
//       icon={icon}
//       sx={{ m: 0.5 }}
//       size="small"
//     />
//   );
// };

// type DeletableProps = Props & {
//   onDelete: ((event: any) => void) | undefined;
// };

// export const DeletableChip: React.FC<DeletableProps> = (
//   props: DeletableProps
// ) => {
//   const { label, icon, onClick, onDelete } = props;

//   return (
//     <MuiChip
//       label={label}
//       onClick={onClick ? onClick : () => {}}
//       onDelete={onDelete}
//       icon={icon}
//       sx={{ m: 0.5 }}
//       size="small"
//     />
//   );
// };

import React, { ReactElement, ReactNode } from "react";
import { Chip as MuiChip, ChipProps as MuiChipProps } from "@mui/material";

type Props = MuiChipProps & {
  readonly label: ReactNode;
  readonly icon?: ReactElement;
};

export const Chip_: React.FC<Props> = (props: Props) => {
  return <MuiChip {...props} size="small" />;
};

type DeletableProps = Props & {
  onDelete: ((event: any) => void) | undefined;
};

export const DeletableChip: React.FC<DeletableProps> = (
  props: DeletableProps
) => {
  return <MuiChip {...props} size="small" />;
};
