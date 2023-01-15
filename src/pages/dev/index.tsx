import { ReactNode } from "react";
import { ThemeContextProvider } from "@features/color/themeColor.hook";
import { TopcoderLikeCircle } from "@features/color/TopCoderLikeCircle.component";

export const DevContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ThemeContextProvider>
        <TopcoderLikeCircle displayPurpose="rating" rating={undefined} />
      </ThemeContextProvider>
    </div>
  );
};
