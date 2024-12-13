import { useMemo, useRef, useState } from "react";

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
  setVerbIsValid: (isValid: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
};

export default function Autocomplete({
  styles = stylesDefault,
  items,
  setVerbIsValid,
  inputValue,
  setInputValue,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredVerbs = useMemo(() => {
    return items.filter((verb) => verb.includes(inputValue)).sort();
  }, [inputValue, items]);

  const handleSelectVerb = (verb: string) => {
    setInputValue(verb);
    setIsFocused(false);
    setVerbIsValid(items.includes(verb));
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (
      !dropdownRef.current ||
      dropdownRef.current.contains(event.relatedTarget as Node)
    )
      return;
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setVerbIsValid(items.includes(event.target.value));
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        placeholder="Enter an Iskonawa verb"
        className={styles.input}
        name="verb"
        required
        autoComplete="off"
      />
      {isFocused && filteredVerbs.length > 0 && (
        <div
          ref={dropdownRef}
          className={`flex flex-col overflow-y-hidden max-h-96 overflow-hidden ${styles.dropdown} `}
        >
          {filteredVerbs.map((verb) => (
            <button
              key={verb}
              onClick={() => handleSelectVerb(verb)}
              className={`${styles.dropdownItem} cursor-pointer mx-2 text-left`}
              type="button"
            >
              {verb}
            </button>
          ))}
        </div>
      )}
      {isFocused && filteredVerbs.length === 0 && (
        <div
          ref={dropdownRef}
          className={`flex flex-col overflow-y-hidden max-h-64 overflow-hidden ${styles.dropdown} `}
        >
          <div className={`px-4 py-2 rounded-lg mx-2 text-left text-opacity-60 text-gray-700 italic`}>
            No se han encontrado coincidencias.
          </div>
        </div>
      )}
    </div>
  );
}
