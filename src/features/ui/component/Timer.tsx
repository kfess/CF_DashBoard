import React, { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  remainingTime: number;
  setRemainingTime: Dispatch<SetStateAction<number>>;
};

export const Timer: React.FC<Props> = (props: Props) => {
  const { remainingTime, setRemainingTime } = props;

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
