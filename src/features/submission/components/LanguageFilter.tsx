import React from "react";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import type { NormalizedLanguage } from "@features/language/language";
import { normalizedLanguage } from "@features/language/language";

export type LanguageFilter = NormalizedLanguage | "All";

type Props = {
  language: LanguageFilter;
  setLanguage: (arg: LanguageFilter) => void;
};

export const LanguageFilterButton: React.FC<Props> = (props: Props) => {
  const { language, setLanguage } = props;

  return (
    <>
      <DropDownMenuButton
        title="Language"
        items={(["All", ...normalizedLanguage]as const).map((lang) => {
          return { item: lang };
        })}
        selectedItem={language}
        setSelectedItem={setLanguage}
      />
    </>
  );
};
