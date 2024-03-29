import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = { toggleShowTags: () => void };

export const ShowTagsSwitch = (props: Props) => {
  const { toggleShowTags } = props;

  return (
    <FormControlLabel
      control={<Switch defaultChecked={false} />}
      label="Show Tags"
      onChange={toggleShowTags}
    />
  );
};
