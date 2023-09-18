import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

type Props = {
  toDate: string;
};

// count down the time to "toDate"
export const Timer: React.FC<Props> = ({ toDate }) => {
  const [remainingTime, setRemainingTime] = useState<number>(
    dayjs(toDate).diff(dayjs(), "seconds")
  );

  useEffect(() => {
    if (remainingTime > 0) {
      const intervalId = setInterval(() => {
        setRemainingTime((remainingTime) => remainingTime - 1);
      }, 1000); // update at the interval of 1 second
      return () => clearInterval(intervalId);
    }
  }, [remainingTime]);

  return (
    <Box display="inline">
      {Math.floor(remainingTime / (60 * 60))}:
      {(
        Math.floor(remainingTime / 60) -
        Math.floor(remainingTime / (60 * 60)) * 60
      )
        .toString()
        .padStart(2, "0")}
      :{(remainingTime % 60).toString().padStart(2, "0")}
    </Box>
  );
};
