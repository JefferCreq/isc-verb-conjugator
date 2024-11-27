import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import ConjugationTable from "~/components/ConjugationTable";
import FilterPanel from "~/components/FilterPanel";
import VerbCard from "~/components/VerbCard";
import VerbConjugatorField from "~/components/VerbConjugatorField";

type ConjugationEntry = {
  forma_base: string;
  inflections: Array<{
    inflection: string;
    mood: string;
    tense: string;
    aspect: string;
    number: string;
  }>;
  translations: {
    spanish_meaning: string;
    english_meaning: string;
  };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL("/data/result_with_meanings.json", request.url);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Error loading JSON file");
  }

  const conjugations = await response.json();

  const languages = [
    { name: "Iskonawa", code: "isc", enabled: true },
    { name: "Español", code: "spa", enabled: false },
    { name: "English", code: "eng", enabled: false },
  ];

  const verbs = conjugations.map((entry: ConjugationEntry) => entry.forma_base);

  return json({ languages, verbs, conjugations });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const verb = formData.get("verb");

  invariant(typeof verb === "string", "Verb must be a string");

  return redirect(`/conjugate/${verb}`);
};

export default function ConjugateVerb() {
  const { verb } = useParams();
  const { languages, verbs, conjugations } = useLoaderData<typeof loader>();

  // console.log(conjugations);
  console.log(verb);

  // Encuentra las conjugaciones del verbo actual

  const verbData =
    conjugations.find((entry: ConjugationEntry) => entry.forma_base === verb) ||
    null;

  if (!verbData) {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col self-center text-left py-14 gap-4 font-normal w-11/12 lg:w-5/6 xl:w-4/6 text-gray-800">
          <h2 className="text-xl">
            Conjugación del verbo <strong className="font-bold">{verb}</strong>{" "}
            en Iskonawa
          </h2>
          <VerbConjugatorField languages={languages} verbs={verbs} />
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full gap-4">
              <p className="text-red-500">
                El verbo <strong className="font-bold">{verb}</strong> no fue
                encontrado en la base de datos
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const verbTranslations = {
    spa: verbData.spanish_meaning,
    eng: verbData.english_meaning,
  };

  return (
    <div className="flex flex-col w-full">
      {/* <HeaderPage
        title={
          <span>
            <strong className="font-bold">Proyecto: &nbsp;</strong>
            Implementación de un prototipo de conjugación de verbos para&nbsp;
            <strong className="font-bold">Iskonawa</strong>
          </span>
        }
      /> */}
      <div className="flex flex-col self-center text-left py-14 gap-4 font-normal w-11/12 lg:w-5/6 xl:w-4/6 text-gray-800">
        <h2 className="text-xl">
          Conjugación del verbo <strong className="font-bold">{verb}</strong> en
          Iskonawa
        </h2>
        <VerbConjugatorField languages={languages} verbs={verbs} />
        <div className="flex flex-row gap-4">
          <div className="flex">
            <FilterPanel />
          </div>
          <div className="flex flex-col w-full gap-4">
            {verb && <VerbCard verb={verb} translations={verbTranslations} />}
            <ConjugationTable data={verbData?.inflections} />
          </div>
        </div>
        <a href="https://huggingface.co/JefferCreq/M2M-ISCVerbInflector-AveragedFold">
          mBART-50 Many-to-Many Multilingual Machine Translation
        </a>
      </div>
    </div>
  );
}

// [
// { inflection: "pia", mood: "IND",  tense: "PRS", aspect: "PERF", number: "SG"},
// { inflection: "pi", mood: "IND",  tense: "PRS", aspect: "IPFV", number: "SG"},
// { inflection: "pipaoni", mood: "IND",  tense: "PRS", aspect: "IPFV", number: "PL"},
// { inflection: "pipaoni", mood: "IND",  tense: "FUT", aspect: "IPFV", number: "SG"},
// { inflection: "pia", mood: "IND",  tense: "PST", aspect: "PERF", number: "SG"},
// { inflection: "pima", mood: "IND",  tense: "PST", aspect: "IPFV", number: "SG"},
// { inflection: "pia", mood: "IMP",  tense: "PRS", aspect: "PERF", number: "SG"},
// { inflection: "pi", mood: "IMP",  tense: "PRS", aspect: "IPFV", number: "SG"},
// { inflection: "pipaoni", mood: "IMP",  tense: "PRS", aspect: "IPFV", number: "PL"},
// ]
