import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { Language, Verb } from "~/types/verb";
import { Input } from "./Input";

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
  items: Verb[];
  verbIsValid: boolean;
  setVerbIsValid: (isValid: boolean) => void;
  // inputValue: string;
  // setInputValue: (value: string) => void;
  selectedLanguage: Language;
  setSelectedVerb: (verb: Verb) => void;
  selectedVerb: Verb | null;
};

export default function Autocomplete({
  styles = stylesDefault,
  items,
  verbIsValid,
  setVerbIsValid,
  // inputValue,
  // setInputValue,
  selectedLanguage,
  setSelectedVerb,
  selectedVerb,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredVerbs = useMemo(() => {
    const key = (selectedLanguage.code + "_verb") as keyof Verb;
    return (
      items
        ?.filter((verb: Verb) => verb[key]?.includes(inputValue))
        .sort()
        .slice(0, 9) ?? []
    );
  }, [inputValue, items, selectedLanguage]);

  const handleSelectVerb = (verb: Verb) => {
    const key = (selectedLanguage.code + "_verb") as keyof Verb;
    const verbString = verb[key];
    setInputValue(verbString);
    setIsFocused(false);
    const verbItems = items.map((item) => item[key]) ?? [];
    setVerbIsValid(verbItems.includes(verbString) ?? false);

    setSelectedVerb(verb);
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
    const key = (selectedLanguage.code + "_verb") as keyof Verb;
    const verbItems = items.map((item) => item[key]);
    setVerbIsValid(verbItems?.includes(event.target.value) ?? false);
  };

  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex(
        (prevIndex) => (prevIndex + 1) % filteredVerbs.length
      );
      setIsFocused(true);
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredVerbs.length) % filteredVerbs.length
      );
      setIsFocused(true);
    } else if (event.key === "Enter") {
      if (isFocused && filteredVerbs.length > 0) {
        handleSelectVerb(filteredVerbs[highlightedIndex]);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative w-full md:min-w-[13rem]"
      ref={listRef}
      onKeyDown={handleKeyDown}
      role="listbox"
      tabIndex={0}
    >
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        placeholder={`Ingrese un verbo en ${selectedLanguage.name.toLowerCase()}`}
        // className={styles.input}
        name="verb_displayed"
        required
        autoComplete="off"
      />
      <input
        name="verb"
        className="hidden"
        defaultValue={selectedVerb?.isc_verb ?? ""}
        readOnly
      />
      {isFocused && filteredVerbs.length > 0 && (
        <div
          ref={dropdownRef}
          className={`flex flex-col overflow-y-hidden max-h-96 overflow-hidden ${styles.dropdown} `}
        >
          {filteredVerbs.map((verb, idx) => {
            const verbString =
              verb[(selectedLanguage.code + "_verb") as keyof Verb];
            const parts = verbString.split(new RegExp(`(${inputValue})`, "gi"));
            return (
              <button
                key={idx}
                onClick={() => handleSelectVerb(verb)}
                className={clsx(
                  styles.dropdownItem,
                  "cursor-pointer mx-2 text-left text-sm",
                  { "bg-gray-100": idx === highlightedIndex }
                )}
                type="button"
              >
                {parts.map((part, index) =>
                  part.toLowerCase() === inputValue.toLowerCase() ? (
                    <strong className="font-extrabold text-amber-700" key={index}>
                      {part}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </button>
            );
          })}
        </div>
      )}
      {isFocused && filteredVerbs.length === 0 && (
        <div
          ref={dropdownRef}
          className={`flex flex-col overflow-y-hidden max-h-64 overflow-hidden ${styles.dropdown} `}
        >
          <div
            className={`px-4 py-2 rounded-lg mx-2 text-left text-opacity-60 text-gray-700 italic`}
          >
            No se han encontrado coincidencias.
          </div>
        </div>
      )}
      <div className={"text-xs text-amber-900 italic pt-1 absolute bottom-12"}>
        {inputValue !== "" && !verbIsValid
          ? "* Ingrese un verbo válido."
          : null}
      </div>
    </div>
  );
}
