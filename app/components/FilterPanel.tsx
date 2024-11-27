import { useState } from "react";

const moodLabels = {
  IND: "Indicativo",
  IMP: "Imperativo",
  DUB: "Dubitativo",
  ASER: "Asertivo",
  DES: "Desiderativo",
  HAB_M: "Habitivo",
};

const tenseLabels = {
  PRS: "Presente",
  PST: "Pasado",
  FUT: "Futuro",
  "DUR.mismo.día": "Durativo mismo día",
  "FUT.INM": "Futuro inmediato",
  "PST.REM": "Pasado remoto",
  "PST.REM.DUR": "Pasado remoto durativo",
  "PST.REM.HAB": "Pasado remoto habitual",
  "PST.yesterday": "Pasado (ayer)",
  "PST.days": "Pasado (hace días)",
  "PST.yet": "Todavía (en curso)",
  "PST.DUR": "El mismo día, durativo",
};

const aspectLabels = {
  PFV: "Perfectivo",
  IPFV: "Imperfectivo",
  EST: "Estativo",
  HAB_A: "Habitual",
  PRG: "Progresivo",
};

const numberLabels = { SG: "Singular", PL: "Plural", DUAL: "Dual" };

const negationLabels = {
  "NEG.FRUS": "Frustrativo",
  NEG: "Negativo",
  "NEG.never": "Nunca",
  "NEG.yet": "Todavía no",
};

const transitivityLabels = {
  TR: "Transitivo",
  INTR: "Intransitivo",
};

const movementLabels = {
  "MOV.ANDA": "Andativo",
  "MOV.DUR": "Durativo",
  "MOV.ITER": "Iterativo",
  "MOV.VEN": "Venitivo",
  "MOV.around": "Dando vuelta",
  "MOV.goto": "Ir a",
  "MOV.passing": "Pasando",
  "MOV.up": "Subiendo",
  "MOV.down": "Bajando",
  "MOV.arrive": "Llegar a",
};

const referenceChangeLabels = {
  "REF.S/A>A": "Sujeto/Agente > Agente",
  "REF.S/A>S": "Sujeto/Agente > Sujeto",
};

const otherLabels = {
  ASOC: "Asociativo",
  BEN: "Benefactivo",
  CAU: "Causativo",
  DIM: "Diminutivo",
  ENF: "Enfático",
  MAL: "Malintencionado",
  REC: "Recíproco",
};

type FilterOption = {
  label: string;
  checked: boolean;
};

type FilterSection = {
  title: string;
  options: FilterOption[];
};

const initialFilters: FilterSection[] = [
  {
    title: "Tiempo",
    options: Object.entries(tenseLabels).map(([key, label]) => ({
      label,
      checked: true,
    })),
  },
  {
    title: "Aspecto",
    options: Object.entries(aspectLabels).map(([key, label]) => ({
      label,
      checked: true,
    })),
  },
  {
    title: "Modo",
    options: Object.entries(moodLabels).map(([key, label]) => ({
      label,
      checked: true,
    })),
  },
  {
    title: "Número",
    options: Object.entries(numberLabels).map(([key, label]) => ({
      label,
      checked: true,
    })),
  },
  {
    title: "Negación",
    options: Object.entries(negationLabels).map(([key, label]) => ({
      label,
      checked: true,
    })),
  },
  {
    title: "Transitividad",
    options: Object.entries(transitivityLabels).map(([key, label]) => ({
      label,
      checked: true,
    })),
  },
  {
    title: "Movimiento",
    options: Object.entries(movementLabels).map(([key, label]) => ({
      label,
      checked: true,
    })),
  },
  {
    title: "Cambio de referencia",
    options: Object.entries(referenceChangeLabels).map(([key, label]) => ({
      label,
      checked: true,
    })),
  },
  {
    title: "Otros",
    options: Object.entries(otherLabels).map(([key, label]) => ({
      label,
      checked: true,
    })),
  },
];

export default function FilterPanel() {
  const [filters, setFilters] = useState(initialFilters);

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

  return (
    <div
      style={{ minHeight: "calc(100vh - 18rem)" }}
      className="w-64 bg-white border border-gray-300 rounded-lg p-4 shadow-lg"
    >
      {filters.map((section, sectionIndex) => (
        <div key={section.title} className="mb-4">
          <details open>
            <summary className="text-lg font-semibold cursor-pointer text-gray-800">
              {section.title}
            </summary>
            <div className="mt-2 space-y-2">
              {section.options.length > 0 ? (
                section.options.map((option, optionIndex) => (
                  <label
                    key={option.label}
                    className="flex items-center space-x-2 cursor-pointer text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => toggleOption(sectionIndex, optionIndex)}
                      className="text-orange-500 rounded focus:ring-0"
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
