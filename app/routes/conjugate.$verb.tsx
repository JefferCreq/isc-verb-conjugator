import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import ConjugationTable from "~/components/ConjugationTable";
import VerbCard from "~/components/VerbCard";
import VerbConjugatorField from "~/components/VerbConjugatorField";

export const meta: MetaFunction = () => {
  return [
    { title: "Conjugando" },
    { name: "description", content: "Cojunga verbos en Iskonawa" },
  ];
};

type ConjugationEntry = {
  forma_base: string;
  inflections: Array<{
    inflection: string;
    key: string | null;
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const urlResults = new URL("/data/result_with_meanings.json", request.url);
  const urlSentences = new URL("/data/isc_sentences.json", request.url);

  const responseResults = await fetch(urlResults.toString());
  if (!responseResults.ok) {
    throw new Error("Error loading Results JSON file");
  }

  const responseSentences = await fetch(urlSentences.toString());
  if (!responseSentences.ok) {
    throw new Error("Error loading Sentences JSON file");
  }

  const conjugationsRes = await responseResults.json();
  const sentencesRes = await responseSentences.json();

  const languages = [
    { name: "Iskonawa", code: "isc", enabled: true },
    { name: "Español", code: "spa", enabled: false },
    { name: "English", code: "eng", enabled: false },
  ];

  const verbs = conjugationsRes.map(
    (entry: ConjugationEntry) => entry.forma_base
  );

  const conjugations = conjugationsRes.map((entry: ConjugationEntry) => {
    const inflections = entry.inflections.map((inflection) => {
      const { mood, tense, aspect, number, key } = inflection;

      const example = sentencesRes.find((e: SentenceEntry) => e.key === key);

      return {
        ...inflection,

        example: example ?? null,
        mood: mood ?? "IND",
        number: number ?? "PLU/SG",
        aspect: aspect ?? "PFV",
        tense: tense ?? "PRS/FUT",
      };
    });

    return {
      ...entry,
      inflections,
    };
  });

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
      <div className="flex flex-col self-center text-left py-14 gap-4 font-normal w-11/12 lg:w-5/6 xl:w-4/6 text-gray-800">
        <h2 className="text-xl">
          Conjugación del verbo <strong className="font-bold">{verb}</strong> en
          Iskonawa
        </h2>
        <VerbConjugatorField languages={languages} verbs={verbs} />
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-full gap-4 overflow-x-auto">
            {verb && <VerbCard verb={verb} translations={verbTranslations} />}
            <ConjugationTable
              data={verbData?.inflections}
              verb={verb ?? ""}
              translations={verbTranslations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
