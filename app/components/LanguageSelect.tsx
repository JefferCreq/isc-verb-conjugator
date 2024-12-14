import { useState, useEffect, useRef } from "react";

type Language = {
  name: string;
  code: string;
  enabled: boolean;
};

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
  languages: Language[];
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
};

export default function LanguageSelect({
  styles = stylesDefault,
  languages,
  selectedLanguage,
  setSelectedLanguage,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % languages.length);
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex(
        (prevIndex) => (prevIndex - 1 + languages.length) % languages.length
      );
    } else if (event.key === "Enter") {
      if (isOpen) {
        setSelectedLanguage(languages[highlightedIndex]);
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }
  };

  useEffect(() => {
    if (isOpen && listRef.current) {
      listRef.current.focus();
      setHighlightedIndex(
        languages.findIndex((lang) => lang.code === selectedLanguage.code)
      );
    }
  }, [isOpen, selectedLanguage, languages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative md:min-w-[13rem] min-w-full w-full"
      onKeyDown={handleKeyDown}
      role="listbox"
      ref={listRef}
      tabIndex={0}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.input} text-left flex justify-between items-center gap-8`}
        type="button"
      >
        {/* <span className="">{selectedLanguage.name}</span> */}
        <div>
          <span>{selectedLanguage.name}</span>{" "}
          <span className="text-gray-400 font-light font-mono text-sm">
            ({selectedLanguage.code})
          </span>
        </div>
        <span className="w-4 h-4">
          <img src="/selector-icon.svg" alt="expand" className="w-4 h-4" />
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang, index) => (
            <span key={lang.code} className={`flex flex-row gap-1`}>
              <div
                className={`w-1 my-1 rounded-lg ${
                  selectedLanguage.code === lang.code ? " bg-orange-500" : ""
                }`}
              ></div>
              <button
                // onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => {
                  setSelectedLanguage(lang);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full mr-2 ${
                  styles.dropdownItem
                } text-left border-white ${
                  highlightedIndex === index ? "bg-gray-100" : ""
                }
                 disabled:opacity-50 disabled:cursor-not-allowed
                `}
                disabled={!lang.enabled}
              >
                <span>{lang.name}</span>
                <span className="text-gray-400 ml-2 font-light font-mono text-sm">
                  ({lang.code})
                </span>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
