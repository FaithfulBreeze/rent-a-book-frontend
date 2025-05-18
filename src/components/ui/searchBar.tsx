import { SearchIcon } from "lucide-react";
import { Input } from "./input";
import { SearchSectionState } from "./searchSection";
import { Dispatch, SetStateAction, useCallback } from "react";
import debounce from "lodash.debounce";

export default function SearchBar({
  setState,
}: {
  setState: Dispatch<SetStateAction<SearchSectionState>>;
}) {
  const debouncedOnChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev: SearchSectionState) => ({
        ...prev,
        searchBarValue: event.target.value,
      }));
    }, 700),
    []
  );

  return (
    <div className="px-64">
      <div className="relative">
        <SearchIcon className="absolute left-4 top-[50%] translate-y-[-50%] z-10 opacity-60" />
        <Input
          className="bg-secondary mb-12 !text-2xl h-auto indent-10"
          placeholder="Search by book name..."
          onChange={debouncedOnChange}
        />
      </div>
    </div>
  );
}
