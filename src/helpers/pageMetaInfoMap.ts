interface TitleMap {
  [key: string]: {
    title: string;
    description: string;
  };
  default: {
    title: string;
    description: string;
  };
  "/": {
    title: string;
    description: string;
  };
  "/problems": {
    title: string;
    description: string;
  };
  "/achievement": {
    title: string;
    description: string;
  };
  "/recommend": {
    title: string;
    description: string;
  };
  "/labels": {
    title: string;
    description: string;
  };
  "/submission": {
    title: string;
    description: string;
  };
  "/custom-contest": {
    title: string;
    description: string;
  };
  "/profile": {
    title: string;
    description: string;
  };
  "/api": {
    title: string;
    description: string;
  };
  "/terms": {
    title: string;
    description: string;
  };
  "/links": {
    title: string;
    description: string;
  };
  "/login": {
    title: string;
    description: string;
  };
  "/setting": {
    title: string;
    description: string;
  };
}

export const pageMetaInfoMap: TitleMap = {
  default: {
    title: "CF-DashBoard",
    description: "description for pages not specified",
  },
  "/": {
    title: "Home | CF-DashBoard",
    description: "This is the contest page",
  },
  "/problems": {
    title: "Problems | CF-DashBoard",
    description: "List of problems",
  },
  "/achievement": {
    title: "Achievement | CF-DashBoard",
    description: "Achievements",
  },
  "/recommend": {
    title: "Recommend | CF-DashBoard",
    description: "Recommendations",
  },
  "/labels": {
    title: "Labels | CF-DashBoard",
    description: "Labels",
  },
  "/submission": {
    title: "Submission | CF-DashBoard",
    description: "Submissions",
  },
  "/custom-contest": {
    title: "Custom Contest | CF-DashBoard",
    description: "Custom Contest",
  },
  "/profile": {
    title: "Profile | CF-DashBoard",
    description: "Profile",
  },
  "/links": {
    title: "Links | CF-DashBoard",
    description: "Links",
  },
  "/api": {
    title: "API | CF-DashBoard",
    description: "API",
  },
  "/terms": {
    title: "Terms | CF-DashBoard",
    description: "Terms",
  },
  "/login": {
    title: "Login | CF-DashBoard",
    description: "Login",
  },
  "/setting": {
    title: "Settings | CF-DashBoard",
    description: "Settings",
  },
};
