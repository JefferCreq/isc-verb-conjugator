import React, { useState } from "react";
import { Input } from "./Input";
import { Textarea } from "./TextArea";
import { Button } from "./Button";
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
import { X } from "lucide-react";
import { Form } from "@remix-run/react";

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

type ModalProps = {
  onClose: () => void;
  item: ConjugationData;
  verb: string;
  translations: {
    spa: string;
    eng: string;
  };
};

const Modal: React.FC<ModalProps> = ({ onClose, item, verb, translations }) => {
  const [inflection, setInflection] = useState<ConjugationData>(item);

  //   const handleSubmit = () => {
  //     // Handle the feedback submission logic here
  //     console.log("Feedback submitted:", feedback);
  //     onClose();
  //   };

  const features = [
    {
      label: "Mood",
      value: moodLabels[inflection.mood as keyof typeof moodLabels],
    },
    {
      label: "Tense",
      value: tenseLabels[inflection.tense as keyof typeof tenseLabels],
    },
    {
      label: "Aspect",
      value: aspectLabels[inflection.aspect as keyof typeof aspectLabels],
    },
    {
      label: "Number",
      value: numberLabels[inflection.number as keyof typeof numberLabels],
    },
    {
      label: "Negation",
      value: negationLabels[inflection.negation as keyof typeof negationLabels],
    },
    {
      label: "Transitivity",
      value:
        transitivityLabels[
          inflection.transitivity as keyof typeof transitivityLabels
        ],
    },
    {
      label: "Movement",
      value: movementLabels[inflection.movement as keyof typeof movementLabels],
    },
    {
      label: "Reference change",
      value:
        referenceChangeLabels[
          inflection.ref_change as keyof typeof referenceChangeLabels
        ],
    },
    {
      label: "Other",
      value: otherLabels[inflection.other as keyof typeof otherLabels],
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-auto max-w-2xl bg-[#F1F1F1] p-10 rounded-lg">
        <div className="w-full justify-between items-center flex flex-row">
          <div className="text-xl font-medium">
            Retroalimentación ligüística
          </div>
          <button onClick={onClose}>
            <X className="text-xl font-medium" />
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-base">Reportar error de conjugación:</h2>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="italic">Forma base</span>{" "}
                  <span className="font-medium">{verb}</span>{" "}
                  <span className="italic text-gray-500 text-xs">
                    ({translations.spa}, {translations.eng})
                  </span>
                </p>
                <p className="text-sm">
                  <span className="italic">Forma flexionada actual:</span>
                </p>
                <p className="font-bold">{inflection.inflection}</p>
                <p className="text-sm">
                  <span className="italic">Características gramaticales:</span>
                </p>
                <p className="text-sm text-gray-600">
                  {features.map((feature) => (
                    <>
                      {feature.value && (
                        <p key={feature.label}>
                          <span className="font-medium">{feature.label}:</span>{" "}
                          {feature.value}
                        </p>
                      )}
                    </>
                  ))}
                </p>
              </div>
            </div>
          </div>

          <Form className="space-y-6">
            <div>
              <p className="mb-4 text-sm">
                Escriba a continuación cuál debería ser la forma correcta
                exacta.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="correctForm">
                    Forma flexionada correcta{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="correctForm"
                    placeholder={`Forma flexionada correcta. Ejemplo: ${verb}`}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="fullName">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="fullName"
                      placeholder="Nombre completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="comments">Comentarios</label>
                  <Textarea
                    id="comments"
                    placeholder="Quiero informar de un problema en conjugador español - Indicativo Futuro pers.1, sg. 'seguiré'"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={onClose} variant="secondary">
                Cancelar
              </Button>
              <Button type="submit">Enviar</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  //       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
  //         <h2 className="text-xl font-bold mb-4">Reportar un error</h2>
  //         <p className="mb-4">
  //           Inflection: <strong>{item.inflection}</strong>
  //         </p>
  //         <textarea
  //           className="w-full p-2 border border-gray-300 rounded mb-4"
  //           rows={4}
  //           value={feedback}
  //           onChange={(e) => setFeedback(e.target.value)}
  //           placeholder="Describe el error o da tu retroalimentación..."
  //         />
  //         <div className="flex justify-end gap-2">
  //           <button
  //             onClick={onClose}
  //             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
  //           >
  //             Cancelar
  //           </button>
  //           <button
  //             onClick={handleSubmit}
  //             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  //           >
  //             Enviar
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default Modal;
