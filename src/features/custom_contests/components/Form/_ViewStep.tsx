import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button } from "@features/ui/component/Button";

type Props = {
  setActiveStep(step: number): void;
};
export const _ViewStep: React.FC<Props> = ({ setActiveStep }) => {
  return (
    <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }}>
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
          border: (theme) => `0.5px solid ${theme.palette.divider}`,
          borderRadius: 3,
        }}
      ></Box>
      <Stack
        direction="row"
        mt={2}
        mr={2}
        spacing={1}
        justifyContent="flex-end"
      >
        <Button onClick={() => setActiveStep(1)} color="secondary">
          Previous
        </Button>
        <Button type="submit">Create Contest</Button>
      </Stack>
    </Box>
  );
};
