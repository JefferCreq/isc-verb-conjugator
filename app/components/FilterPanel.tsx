type FilterOption = {
  key: string;
  label: string;
  checked: boolean;
};

type FilterSection = {
  title: string;
  label: string;
  options: FilterOption[];
};

type FilterPanelProps = {
  filters: FilterSection[];
  setFilters: React.Dispatch<React.SetStateAction<FilterSection[]>>;
};

export default function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  // console.log(JSON.stringify(filters, null, 2));

  const toggleOption = (sectionIndex: number, optionIndex: number) => {
    setFilters((prevFilters) =>
      prevFilters.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              options: section.options.map((option, oIndex) =>
                oIndex === optionIndex
                  ? { ...option, checked: !option.checked }
                  : option
              ),
            }
          : section
      )
    );
  };

  const toggleAllOptions = (sectionIndex: number, checked: boolean) => {
    setFilters((prevFilters) =>
      prevFilters.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              options: section.options.map((option) => ({
                ...option,
                checked: checked,
              })),
            }
          : section
      )
    );
  };

  const isAllChecked = (sectionIndex: number) => {
    return filters[sectionIndex].options.every(option => option.checked);
  };

  return (
    <div
      // style={{ minHeight: "calc(100vh - 18rem)" }}
      className="w-96 bg-white border border-gray-300 rounded-lg p-4 shadow-lg"
    >
      {filters.map((section, sectionIndex) => (
        <div key={section.title} className="mb-4">
          <details open>
            <summary className="text-md font-semibold cursor-pointer text-gray-800 flex justify-between items-center">
              {section.title}
              <input
                type="checkbox"
                checked={isAllChecked(sectionIndex)}
                onChange={(e) => toggleAllOptions(sectionIndex, e.target.checked)}
                className="accent-orange-500"
                title="Toggle All"
              />
            </summary>
            <div className="mt-2 space-y-2">
              {section.options.length > 0 ? (
                section.options.map((option, optionIndex) => (
                  <label
                    key={option.label}
                    className="flex items-center space-x-2 cursor-pointer text-gray-700 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => toggleOption(sectionIndex, optionIndex)}
                      className="accent-orange-500"
                    />
                    <span>{option.label}</span>
                  </label>
                ))
              ) : (
                <p className="text-gray-500">No options available</p>
              )}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
