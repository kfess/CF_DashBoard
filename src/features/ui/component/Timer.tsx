import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

type Props = {
  endDate: string;
};

export const Timer: React.FC<Props> = (props: Props) => {
  const { endDate } = props;
  const [remainingTime, setRemainingTime] = useState<number>(
    dayjs(endDate).diff(dayjs(), "seconds")
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
    <>
      {Math.floor(remainingTime / (60 * 60))}:
      {(
        Math.floor(remainingTime / 60) -
        Math.floor(remainingTime / (60 * 60)) * 60
      )
        .toString()
        .padStart(2, "0")}
      :{(remainingTime % 60).toString().padStart(2, "0")}
    </>
  );
};
