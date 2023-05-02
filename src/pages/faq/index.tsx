import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Accordions } from "@features/ui/component/Accordions";
import { HeadLine } from "@features/layout/components/HeadLine";
import { faqData } from "@features/faq/faq";

export const FAQPage: React.FC = () => {
  const accordionItems = faqData.map((item) => {
    return {
      title: item.question,
      description: item.answer,
    };
  });

  return (
    <Box sx={{ p: 1 }}>
      <HeadLine title="FAQ" />
      <Box sx={{ p: 2 }}>
        <Accordions accordionItems={accordionItems} />
      </Box>
    </Box>
  );
};
