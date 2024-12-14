import { useState, useMemo } from "react";
import {
  aspectLabels,
  moodLabels,
  movementLabels,
  negationLabels,
  numberLabels,
  otherLabels,
  referenceChangeLabels,
  tenseLabels,
  transitivityLabels,
  allLabels,
} from "~/utils/labels";
import FilterPanel from "./FilterPanel";
import { FaFilter } from "react-icons/fa";
import { FaFilterCircleXmark } from "react-icons/fa6";
import Modal from "./Modal";
import CardInflection from "./CardInflection";
import { NavLink } from "@remix-run/react";

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

const initialFilters: FilterSection[] = [
  {
    title: "Modo",
    label: "mood",
    options: Object.entries(moodLabels).map(([key, label]) => ({
      key,
      label,
      checked: true,
    })),
  },
  {
    title: "Aspecto",
    label: "aspect",
    options: Object.entries(aspectLabels).map(([key, label]) => ({
      key,
      label,
      checked: true,
    })),
  },
  {
    title: "Tiempo",
    label: "tense",
    options: Object.entries(tenseLabels).map(([key, label]) => ({
      key,
      label,
      checked: true,
    })),
  },
  {
    title: "Número",
    label: "number",
    options: Object.entries(numberLabels).map(([key, label]) => ({
      key,
      label,
      checked: true,
    })),
  },
  {
    title: "Negación",
    label: "negation",
    options: Object.entries(negationLabels).map(([key, label]) => ({
      key,
      label,
      checked: true,
    })),
  },
  {
    title: "Transitividad",
    label: "transitivity",
    options: Object.entries(transitivityLabels).map(([key, label]) => ({
      key,
      label,
      checked: true,
    })),
  },
  {
    title: "Movimiento",
    label: "movement",
    options: Object.entries(movementLabels).map(([key, label]) => ({
      key,
      label,
      checked: true,
    })),
  },
  {
    title: "Cambio de referencia",
    label: "ref_change",
    options: Object.entries(referenceChangeLabels).map(([key, label]) => ({
      key,
      label,
      checked: true,
    })),
  },
  {
    title: "Otros",
    label: "other",
    options: Object.entries(otherLabels).map(([key, label]) => ({
      key,
      label,
      checked: true,
    })),
  },
];

// //////////////////

type SentenceEntry = {
  index: string;
  iskonawa_sentence: string;
  suffix_sentence: string;
  annotated_sentence: string;
  spanish_sentence: string;
  reference: string;
  key: string;
  spanish_verbs: string;
};

type ConjugationData = {
  inflection: string;
  example: SentenceEntry | null;
  key: string | null;
  mood: string;
  tense: string;
  aspect: string;
  number: string;
  negation?: string;
  transitivity?: string;
  movement?: string;
  ref_change?: string;
  other?: string;
};

type ConjugationTableProps = {
  data: ConjugationData[];
  verb: string;
  translations: {
    spa: string;
    eng: string;
  };
};

// Prioridades para ordenar
const tenseOrder = { PRS: 1, PST: 2, "PST.ayer": 3, FUT: 4 };
const numberOrder = { "PLU/SG": 1, SG: 2, PL: 3 };
const moodOrder = { IND: 1, IMP: 2, DUB: 3, ASER: 4, DES: 5, HAB_M: 6 };
const aspectOrder = { PFV: 1, IPFV: 2, EST: 3, HAB_A: 4, PRG: 5 };

const transitivityOrder = { TR: 1, INTR: 2 };

const negationOrder = { NEG: 1, "NEG.never": 2, "NEG.yet": 3, "NEG.FRUS": 4 };

const groupOptions = [
  { value: "tense", label: "Tiempo", dictLabel: tenseLabels },
  { value: "aspect", label: "Aspecto", dictLabel: aspectLabels },
  { value: "mood", label: "Modo", dictLabel: moodLabels },
  { value: "number", label: "Número", dictLabel: numberLabels },
];

type ComponentProps = {
  children: React.ReactNode;
  groupBy: string;
  category: string;
  labels: Record<string, string>;
  keyLabel: string;
  classNameLabel?: string;
};

function Component({
  children,
  groupBy,
  category,
  labels,
  keyLabel,
  classNameLabel,
}: ComponentProps) {
  const showAsDetails: boolean = groupBy !== category;

  if (showAsDetails) {
    return (
      <details open className="category">
        <summary className={classNameLabel}>
          {labels[keyLabel as keyof typeof labels] ?? "No especificado"}
        </summary>
        {children}
      </details>
    );
  }

  return <div>{children}</div>;
}

export default function ConjugationTable({
  data,
  verb,
  translations,
}: ConjugationTableProps) {
  const [groupBy, setGroupBy] = useState<string>("tense");
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [filters, setFilters] = useState(initialFilters);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ConjugationData | null>(
    null
  );

  const handleReportClick = (item: ConjugationData) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return filters.every((filterSection) => {
        // Encuentra la opción en los filtros
        const activeOptions = filterSection.options
          .filter((option) => option.checked)
          .map((option) => option.key);

        // Obtén el valor correspondiente en el objeto `item`
        const value = item[filterSection.label as keyof ConjugationData];

        // Si el valor existe, asegúrate de que está en las opciones activas
        if (typeof value === "string") {
          return activeOptions.includes(value);
        }

        // Si no hay valor, pasa el filtro
        return true;
      });
    });
  }, [data, filters]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const getOrder = (
        value: string | undefined,
        order: Record<string, number>
      ) =>
        value === undefined
          ? -1
          : order[value as keyof typeof order] ?? Infinity;

      const tenseComparison =
        getOrder(a.tense, tenseOrder) - getOrder(b.tense, tenseOrder);
      if (tenseComparison !== 0) return tenseComparison;

      const aspectComparison =
        getOrder(a.aspect, aspectOrder) - getOrder(b.aspect, aspectOrder);
      if (aspectComparison !== 0) return aspectComparison;

      const moodComparison =
        getOrder(a.mood, moodOrder) - getOrder(b.mood, moodOrder);
      if (moodComparison !== 0) return moodComparison;

      const transitivityComparison =
        getOrder(a.transitivity, transitivityOrder) -
        getOrder(b.transitivity, transitivityOrder);
      if (transitivityComparison !== 0) return transitivityComparison;

      const numberComparison =
        getOrder(a.number, numberOrder) - getOrder(b.number, numberOrder);
      if (numberComparison !== 0) return numberComparison;

      return (
        getOrder(a.negation, negationOrder) -
        getOrder(b.negation, negationOrder)
      );
    });
  }, [filteredData]);

  const groupedData = useMemo(() => {
    return sortedData.reduce((acc, item) => {
      const key =
        String(item[groupBy as keyof ConjugationData]) ??
        "undefined_" + groupBy;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, ConjugationData[]>);
  }, [sortedData, groupBy]);

  return (
    <div className="">
      <div className="flex flex-row items-center mb-4 gap-6 w-full overflow-x-auto">
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="flex flex-row items-center gap-2 font-semibold"
        >
          {showPanel ? <FaFilterCircleXmark /> : <FaFilter />} Filtros
        </button>
        <div>
          <label htmlFor="groupBySelect" className="mr-2 font-semibold">
            Agrupar por:
          </label>
          <select
            id="groupBySelect"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            {groupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="border border-gray-300 w-fit rounded-md">
            <div className="bg-orange-700 w-5 h-5 border-2 border-white rounded-md" />
          </div>
          <span className="text-sm">Conjugación de la bibliografía</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="border border-gray-300 w-fit rounded-md">
            <div className="bg-gray-400 w-5 h-5 border-2 border-white rounded-md" />
          </div>
          <span className="text-sm">
            Conjugación generada por el <NavLink to="/model" className="text-orange-700 underline">modelo</NavLink>
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4 w-full">
        {showPanel && <FilterPanel filters={filters} setFilters={setFilters} />}
        <div className="space-y-4 category w-full">
          {Object.entries(groupedData).map(([key, items], index) => {
            const groupedByAspect = items.reduce((acc, item) => {
              const aspectKey = item.aspect ?? "undefined_aspect";
              if (!acc[aspectKey]) acc[aspectKey] = [];
              acc[aspectKey].push(item);
              return acc;
            }, {} as Record<string, ConjugationData[]>);

            return (
              <details
                key={index}
                open
                className="border border-[#402A2B] border-opacity-20 p-4 rounded-lg category w-full"
              >
                <summary className="text-lg font-bold mb-1 cursor-pointer flex items-center">
                  {allLabels[key as keyof typeof allLabels]}
                </summary>
                {Object.entries(groupedByAspect).map(
                  ([aspectKey, aspectItems], idx) => {
                    const groupedByMood = aspectItems.reduce((acc, item) => {
                      const moodKey = item.mood ?? "undefined_mood";
                      if (!acc[moodKey]) acc[moodKey] = [];
                      acc[moodKey].push(item);
                      return acc;
                    }, {} as Record<string, ConjugationData[]>);
                    return (
                      <Component
                        key={idx}
                        groupBy={groupBy}
                        category={"aspect"}
                        labels={aspectLabels}
                        keyLabel={aspectKey}
                        classNameLabel="text-md font-semibold mb-1 ml-2 cursor-pointer flex items-center"
                      >
                        {Object.entries(groupedByMood).map(
                          ([moodKey, moodItems], idz) => {
                            const groupedByTense = moodItems.reduce(
                              (acc, item) => {
                                const tenseKey =
                                  item.tense ?? "undefined_tense";
                                if (!acc[tenseKey]) acc[tenseKey] = [];
                                acc[tenseKey].push(item);
                                return acc;
                              },
                              {} as Record<string, ConjugationData[]>
                            );
                            return (
                              <Component
                                key={idz}
                                groupBy={groupBy}
                                category={"mood"}
                                labels={moodLabels}
                                keyLabel={moodKey}
                                classNameLabel="text-base text-zinc-600 font-semibold mb-1 ml-4 cursor-pointer flex items-center"
                              >
                                {Object.entries(groupedByTense).map(
                                  ([tenseKey, tenseItems], idy) => {
                                    const groupedByNumber = tenseItems.reduce(
                                      (acc, item) => {
                                        const numberKey =
                                          item.number ?? "undefined_number";
                                        if (!acc[numberKey])
                                          acc[numberKey] = [];
                                        acc[numberKey].push(item);
                                        return acc;
                                      },
                                      {} as Record<string, ConjugationData[]>
                                    );
                                    return (
                                      <Component
                                        key={idy}
                                        groupBy={groupBy}
                                        category={"tense"}
                                        labels={tenseLabels}
                                        keyLabel={tenseKey}
                                        classNameLabel="text-sm text-zinc-500 font-semibold mb-1 ml-6 cursor-pointer flex items-center"
                                      >
                                        {Object.entries(groupedByNumber).map(
                                          ([numberKey, numberItems], idw) => (
                                            <Component
                                              key={idw}
                                              groupBy={groupBy}
                                              category={"number"}
                                              labels={numberLabels}
                                              keyLabel={numberKey}
                                              classNameLabel="text-xs text-zinc-400 font-semibold mb-1 ml-8 cursor-pointer flex items-center"
                                            >
                                              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-1 my-3">
                                                {numberItems.map(
                                                  (item, idv) => (
                                                    <CardInflection
                                                      key={idv}
                                                      item={item}
                                                      handleReportClick={
                                                        handleReportClick
                                                      }
                                                    />
                                                  )
                                                )}
                                              </div>
                                            </Component>
                                          )
                                        )}
                                      </Component>
                                    );
                                  }
                                )}
                              </Component>
                            );
                          }
                        )}
                      </Component>
                    );
                  }
                )}
              </details>
            );
          })}
        </div>
      </div>
      {showModal && selectedItem && (
        <Modal
          onClose={handleCloseModal}
          item={selectedItem}
          verb={verb}
          translations={translations}
        />
      )}
    </div>
  );
}
