import React, {useState} from "react";
import { Input } from "@features/ui/component/Input";
import useDebounce from "@hooks/useDebounce"


type Props = {
  query: string;
  setQuery: (query: string) => void;
};

export const FuzzySearch: React.FC<Props> = ({ query, setQuery }) => {
    const [debouncedValue, setDebouncedValue] = useState("")
    const [, cancel] = useDebounce(() =>{setQuery(val)}, [val])

    return (
    <Input
      id="fuzzy-search"
      value={query}
      onChange={(e) => setDebouncedValue(e.target.value)}
      placeholder="Search Label"
      type="text"
    />
  );
};
