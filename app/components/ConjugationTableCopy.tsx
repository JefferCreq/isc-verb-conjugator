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
} from "~/utils/labels";

type ConjugationData = {
  inflection: string;
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
};

// Prioridades para ordenar
const tenseOrder = { PRS: 1, PST: 2, "PST.ayer": 3, FUT: 4 };
const numberOrder = { SG: 0, PL: 1 };
const moodOrder = { IND: 1, IMP: 2, DUB: 3, ASER: 4, DES: 5, HAB_M: 6 };
const aspectOrder = { PFV: 1, IPFV: 2, EST: 3, HAB_A: 4, PRG: 5 };

export default function ConjugationTable({ data }: ConjugationTableProps) {
  // Ordenar los datos según las prioridades definidas
  const sortedData = [...data].sort((a, b) => {
    const getOrder = (value: string | undefined, order: Record<string, number>) =>
      value === undefined ? -1 : order[value as keyof typeof order] ?? Infinity;

    const tenseComparison =
      getOrder(a.tense, tenseOrder) - getOrder(b.tense, tenseOrder);
    if (tenseComparison !== 0) return tenseComparison;

    const aspectComparison =
      getOrder(a.aspect, aspectOrder) - getOrder(b.aspect, aspectOrder);
    if (aspectComparison !== 0) return aspectComparison;

    const moodComparison =
      getOrder(a.mood, moodOrder) - getOrder(b.mood, moodOrder);
    if (moodComparison !== 0) return moodComparison;

    return getOrder(a.number, numberOrder) - getOrder(b.number, numberOrder);
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Conjugación</th>
            <th className="px-4 py-2 border">Tiempo</th>
            <th className="px-4 py-2 border">Aspecto</th>
            <th className="px-4 py-2 border">Modo</th>
            <th className="px-4 py-2 border">Número</th>
            <th className="px-4 py-2 border">Negación</th>
            <th className="px-4 py-2 border">Transitividad</th>
            <th className="px-4 py-2 border">Movimiento</th>
            <th className="px-4 py-2 border">Cambio de Referencia</th>
            <th className="px-4 py-2 border">Otros</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border font-bold">{item.inflection}</td>
              <td className="px-4 py-2 border">
                {tenseLabels[item.tense as keyof typeof tenseLabels] ?? "-"}
              </td>
              <td className="px-4 py-2 border">
                {aspectLabels[item.aspect as keyof typeof aspectLabels] ?? "-"}
              </td>
              <td className="px-4 py-2 border">
                {moodLabels[item.mood as keyof typeof moodLabels] ?? "-"}
              </td>
              <td className="px-4 py-2 border">
                {numberLabels[item.number as keyof typeof numberLabels] ?? "-"}
              </td>
              <td className="px-4 py-2 border">
                {negationLabels[item.negation as keyof typeof negationLabels]}
              </td>
              <td className="px-4 py-2 border">
                {
                  transitivityLabels[
                    item.transitivity as keyof typeof transitivityLabels
                  ]
                }
              </td>
              <td className="px-4 py-2 border">
                {movementLabels[item.movement as keyof typeof movementLabels] ??
                  "-"}
              </td>
              <td className="px-4 py-2 border">
                {referenceChangeLabels[
                  item.ref_change as keyof typeof referenceChangeLabels
                ] ?? "-"}
              </td>
              <td className="px-4 py-2 border">
                {otherLabels[item.other as keyof typeof otherLabels] ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
