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
  
  type ConjugationCardsProps = {
    data: ConjugationData[];
  };
  
  // Prioridades para ordenar
  const tenseOrder = { PRS: 1, PST: 2, "PST.ayer": 3, FUT: 4 };
  const numberOrder = { SG: 0, PL: 1 };
  const moodOrder = { IND: 1, IMP: 2, DUB: 3, ASER: 4, DES: 5, HAB_M: 6 };
  const aspectOrder = { PFV: 1, IPFV: 2, EST: 3, HAB_A: 4, PRG: 5 };
  
  export default function ConjugationCards({ data }: ConjugationCardsProps) {
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
      const otherKey = item.other ?? "default";
      if (!acc[item.mood][item.tense][item.aspect][otherKey])
        acc[item.mood][item.tense][item.aspect][otherKey] = [];
      acc[item.mood][item.tense][item.aspect][otherKey].push(item);
      return acc;
    }, {} as { [mood: string]: { [tense: string]: { [aspect: string]: { [number: string]: ConjugationData[] } } } });
    console.log(JSON.stringify(sortedData, null, 2));
  
    return (
      <div className="space-y-8">
        {Object.entries(groupedData).map(([mood, tenseData]) => (
          <div key={mood} className="overflow-hidden border-none">
            <div className="bg-[#402A2B] bg-opacity-25 text-[#402A2B] text-lg font-bold px-4 py-2 uppercase text-center rounded-lg border-none">
              {moodLabels[mood as keyof typeof moodLabels] ?? "Indicativo"}
            </div>
            <div className="w-full text-left grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
              {Object.entries(tenseData).map(([tense, aspectData]) => (
                <>
                  <div className="col-span-2 bg-white p-2 rounded-t">
                    {tenseLabels[tense as keyof typeof tenseLabels] ??
                      "Presente/Futuro"}
                  </div>
                  <>
                    {Object.entries(aspectData).map(([aspect, othrerData]) => (
                      <>
                        <div className="text-gray-700 font-medium px-4 text-sm col-span-2  bg-white p-2 ">
                          {aspectLabels[aspect as keyof typeof aspectLabels] ??
                            "Perfectivo"}
                        </div>
                        <>
                          <>
                            {Object.entries(othrerData).map(([other, items]) => (
                              <div key={other} className="py-2 px-4 bg-white">
                                {otherLabels[
                                  other as keyof typeof otherLabels
                                ] ? (
                                  <div className="text-gray-600 text-sm">
                                    {otherLabels[
                                      other as keyof typeof otherLabels
                                    ] ?? "General"}
                                  </div>
                                ) : null}
  
                                {items.map((item, index) => (
                                  <div
                                    key={index}
                                    className="px-4 py-2 text-gray-500 rounded-lg bg-gray-50 shadow-sm hover:shadow-md"
                                  >
                                    <div className="font-semibold">
                                      {item.inflection}
                                    </div>
                                    {item.number && (
                                      <div className="text-xs text-gray-600">
                                        Número:{" "}
                                        {
                                          numberLabels[
                                            item.number as keyof typeof numberLabels
                                          ]
                                        }
                                      </div>
                                    )}
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
                                  </div>
                                ))}
                              </div>
                            ))}
                          </>
                        </>
                      </>
                    ))}
                  </>
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  