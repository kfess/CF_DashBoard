import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = { showTags: boolean; toggleShowTags: () => void };

export const ShowTagsSwitch = (props: Props) => {
  const { showTags, toggleShowTags } = props;

  return (
    <FormControlLabel
      control={<Switch checked={showTags} />}
      label="Show Tags"
      onChange={toggleShowTags}
    />
  );
};
