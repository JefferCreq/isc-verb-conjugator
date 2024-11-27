import { useState } from "react";

const stylesDefault = {
  input:
    "w-full min-h-12  bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none",
  dropdown:
    "absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 py-2",
  dropdownItem: "px-4 py-2 hover:bg-gray-100 rounded-lg",
};

type Props = {
  styles?: {
    input: string;
    dropdown: string;
    dropdownItem: string;
  };
  items: string[];
};

export default function Autocomplete({ styles = stylesDefault, items }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [filteredVerbs, setFilteredVerbs] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setFilteredVerbs(items.filter((verb) => verb.startsWith(value)));
    } else {
      setFilteredVerbs([]);
    }
  };

  const handleSelectVerb = (verb: string) => {
    console.log(verb);
    setInputValue(verb);
    setFilteredVerbs([]);
    setIsFocused(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    verb: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      handleSelectVerb(verb);
    }
  };

  return (
    <div className="relative w-full ">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        placeholder="Enter an Iskonawa verb"
        className={styles.input}
        name="verb"
        required
        autoComplete="off"
      />
      {isFocused && filteredVerbs.length > 0 && (
        <div className={`flex flex-col overflow-y-hidden max-h-96 overflow-hidden ${styles.dropdown}`}>
          {filteredVerbs.map((verb) => (
            <div
              key={verb}
              onClick={() => handleSelectVerb(verb)}
              onKeyDown={(event) => handleKeyDown(event, verb)}
              role="button"
              tabIndex={0}
              className={`${styles.dropdownItem} cursor-pointer mx-2`}
            >
              {verb}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
