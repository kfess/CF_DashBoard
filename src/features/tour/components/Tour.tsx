import "shepherd.js/dist/css/shepherd.css";
import React, { useContext, useEffect } from "react";
import {
  ShepherdTour,
  ShepherdTourContext,
  ShepherdOptionsWithType,
} from "react-shepherd";
import { useLocalStorage } from "@hooks/useLocalStorage";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: { enabled: true },
  },
  useModalOverlay: true,
};

const tourSteps: ShepherdOptionsWithType[] = [
  {
    id: "first-step",
    title: "Search Codeforces User ID",
    text: [
      "You can get various information about the user throughout this application.",
    ],
    attachTo: {
      element: ".username-search-bar",
      on: "bottom",
    },
    buttons: [
      {
        classes: "shepherd-button-secondary",
        text: "OK",
        type: "cancel",
      },
    ],
    classes: "custom-class-name-1 custom-class-name-2",
    highlightClass: "highlight",
  },
];

const TourInstance = () => {
  const tour = useContext(ShepherdTourContext);
  const [isFirstVisit, setIsFirstVisit] = useLocalStorage("isFirstVisit", true);

  useEffect(() => {
    if (tour && isFirstVisit) {
      setTimeout(() => {
        tour.start();
        setIsFirstVisit(false);
      }, 3000); // 3s
    }
  }, [tour]);

  return <></>;
};

export const Tour: React.FC = () => {
  return (
    <ShepherdTour steps={tourSteps} tourOptions={tourOptions}>
      <TourInstance />
    </ShepherdTour>
  );
};
