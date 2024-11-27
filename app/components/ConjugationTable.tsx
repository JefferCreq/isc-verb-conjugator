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
  "MOV.arrive": "Llegar a"
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

// Prioridades para ordenar
const tenseOrder = { PRS: 1, PST: 2, "PST.ayer": 3, FUT: 4 };
const numberOrder = { SG: 0, PL: 1 };
const moodOrder = { IND: 1, IMP: 2, DUB: 3, ASER: 4, DES: 5, HAB_M: 6 };
const aspectOrder = { PFV: 1, IPFV: 2, EST: 3, HAB_A: 4, PRG: 5 };

export default function ConjugationTable({ data }: ConjugationTableProps) {
  // Ordenar los datos según las prioridades definidas
  const sortedData = [...data].sort((a, b) => {
    if (
      tenseOrder[a.tense as keyof typeof tenseOrder] !==
      tenseOrder[b.tense as keyof typeof tenseOrder]
    ) {
      return (
        tenseOrder[a.tense as keyof typeof tenseOrder] -
        tenseOrder[b.tense as keyof typeof tenseOrder]
      );
    }
    if (
      aspectOrder[a.aspect as keyof typeof aspectOrder] !==
      aspectOrder[b.aspect as keyof typeof aspectOrder]
    ) {
      return (
        aspectOrder[a.aspect as keyof typeof aspectOrder] -
        aspectOrder[b.aspect as keyof typeof aspectOrder]
      );
    }
    if (
      moodOrder[a.mood as keyof typeof moodOrder] !==
      moodOrder[b.mood as keyof typeof moodOrder]
    ) {
      return (
        moodOrder[a.mood as keyof typeof moodOrder] -
        moodOrder[b.mood as keyof typeof moodOrder]
      );
    }
    return (
      numberOrder[a.number as keyof typeof numberOrder] -
      numberOrder[b.number as keyof typeof numberOrder]
    );
  });

  // Agrupar los datos jerárquicamente
  const groupedData = sortedData.reduce((acc, item) => {
    if (!acc[item.mood]) acc[item.mood] = {};
    if (!acc[item.mood][item.tense]) acc[item.mood][item.tense] = {};
    if (!acc[item.mood][item.tense][item.aspect])
      acc[item.mood][item.tense][item.aspect] = {};
    if (!acc[item.mood][item.tense][item.aspect][item.number])
      acc[item.mood][item.tense][item.aspect][item.number] = {};
    const otherKey = item.other ?? "default";
    if (!acc[item.mood][item.tense][item.aspect][item.number][otherKey])
      acc[item.mood][item.tense][item.aspect][item.number][otherKey] = [];
    acc[item.mood][item.tense][item.aspect][item.number][otherKey].push(item);
    return acc;
  }, {} as { [mood: string]: { [tense: string]: { [aspect: string]: { [number: string]: { [number: string]: ConjugationData[] } } } } });

  return (
    <div className="space-y-8">
      {Object.entries(groupedData).map(([mood, tenseData]) => (
        <div key={mood} className="overflow-hidden border-none">
          <div className="bg-[#402A2B] bg-opacity-25 text-[#402A2B] text-lg font-bold px-4 py-2 uppercase text-center rounded-lg border-none">
            {moodLabels[mood as keyof typeof moodLabels] ?? "Indicativo"}
          </div>
          <div className="w-full text-left grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 mt-2">
            {Object.entries(tenseData).map(([tense, aspectData]) => (
              <div
                key={tense}
                className="bg-white rounded-lg pt-2 pb-3 pr-4 pl-1"
              >
                <div className="text-gray-800 font-semibold py-1 px-4 rounded-t-lg text-sm">
                  {tenseLabels[tense as keyof typeof tenseLabels] ??
                    "Presente/Futuro"}
                </div>
                <div className="ml-4 border-l-4 border-gray-200 hover:border-[#402A2B] hover:border-opacity-25 pl-4">
                  {Object.entries(aspectData).map(([aspect, numberData]) => (
                    <div key={aspect} className="py-2">
                      <div className="text-gray-700 font-medium px-4 text-sm">
                        {aspectLabels[aspect as keyof typeof aspectLabels] ??
                          "Perfectivo"}
                      </div>
                      <div className="ml-4 border-l-4 border-gray-200 pl-4">
                        {Object.entries(numberData).map(
                          ([number, othrerData]) => (
                            <div key={number} className="py-2">
                              <div className="text-gray-600 text-sm">
                                {numberLabels[
                                  number as keyof typeof numberLabels
                                ] ?? "Singular/Plural"}
                              </div>
                              <div className="ml-4 border-l-4 border-gray-200 pl-4">
                                {Object.entries(othrerData).map(
                                  ([other, items]) => (
                                    <div key={other} className="py-2">
                                      <div className="text-gray-600 text-sm">
                                        {otherLabels[
                                          other as keyof typeof otherLabels
                                        ] ?? "General"}
                                      </div>

                                      {items.map((item, index) => (
                                        <div
                                          key={index}
                                          className="px-4 py-2 text-gray-500 rounded-lg bg-gray-50 shadow-sm hover:shadow-md"
                                        >
                                          <div className="font-semibold">
                                            {item.inflection}
                                          </div>
                                          {item.negation && (
                                            <div className="text-xs text-gray-600">
                                              Negación
                                              {(item.negation !== "NEG" &&
                                                `: ${
                                                  negationLabels[
                                                    item.negation as keyof typeof negationLabels
                                                  ]
                                                }`) ||
                                                ""}
                                            </div>
                                          )}
                                          {item.transitivity && (
                                            <div className="text-xs text-gray-600">
                                              Transitividad:{" "}
                                              {
                                                transitivityLabels[
                                                  item.transitivity as keyof typeof transitivityLabels
                                                ]
                                              }
                                            </div>
                                          )}
                                          {item.movement && (
                                            <div className="text-xs text-gray-600">
                                              Movimiento:{" "}
                                              {
                                                movementLabels[
                                                  item.movement as keyof typeof movementLabels
                                                ]
                                              }
                                            </div>
                                          )}
                                          {item.ref_change && (
                                            <div className="text-xs text-gray-600">
                                              Cambio de referencia:{" "}
                                              {
                                                referenceChangeLabels[
                                                  item.ref_change as keyof typeof referenceChangeLabels
                                                ]
                                              }
                                            </div>
                                          )}
                                          {/* {item.other && (
                                            <div className="text-xs text-gray-600">
                                              Otros:{" "}
                                              {
                                                otherLabels[
                                                  item.other as keyof typeof otherLabels
                                                ]
                                              }
                                            </div>
                                          )} */}
                                        </div>
                                      ))}
                                    </div>
                                  )
                                )}
                              </div>

                              {/* {items.map((item, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 text-gray-500 rounded-lg bg-gray-50 shadow-sm hover:shadow-md"
                              >
                                <div className="font-semibold">
                                  {item.inflection}
                                </div>
                                {item.negation && (
                                  <div className="text-xs text-gray-600">
                                    Negación
                                    {(item.negation !== "NEG" &&
                                      `: ${
                                        negationLabels[
                                          item.negation as keyof typeof negationLabels
                                        ]
                                      }`) ||
                                      ""}
                                  </div>
                                )}
                                {item.transitivity && (
                                  <div className="text-xs text-gray-600">
                                    Transitividad:{" "}
                                    {
                                      transitivityLabels[
                                        item.transitivity as keyof typeof transitivityLabels
                                      ]
                                    }
                                  </div>
                                )}
                                {item.movement && (
                                  <div className="text-xs text-gray-600">
                                    Movimiento:{" "}
                                    {
                                      movementLabels[
                                        item.movement as keyof typeof movementLabels
                                      ]
                                    }
                                  </div>
                                )}
                                {item.ref_change && (
                                  <div className="text-xs text-gray-600">
                                    Cambio de referencia:{" "}
                                    {
                                      referenceChangeLabels[
                                        item.ref_change as keyof typeof referenceChangeLabels
                                      ]
                                    }
                                  </div>
                                )}
                                {item.other && (
                                  <div className="text-xs text-gray-600">
                                    Otros:{" "}
                                    {
                                      otherLabels[
                                        item.other as keyof typeof otherLabels
                                      ]
                                    }
                                  </div>
                                )}
                              </div>
                            ))} */}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
