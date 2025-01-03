import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import HeaderPage from "~/components/HeaderPage";
import VerbConjugatorField from "~/components/VerbConjugatorField";
import { ConjugationEntry, Language } from "~/types/verb";

export const meta: MetaFunction = () => {
  return [
    { title: "Conjugación de verbos Iskonawa" },
    {
      name: "description",
      content:
        "El conjugador de verbos en Iskonawa es una herramienta diseñada para apoyar el aprendizaje y preservación de esta lengua amazónica en peligro de extinción. Ingresa un verbo en Iskonawa, selecciona el contexto gramatical y descubre cómo se conjuga en distintos tiempos, modos y aspectos. ¡Sumérgete en la riqueza de este idioma y contribuye a mantener viva su herencia cultural!",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL("/data/result_with_meanings.json", request.url);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Error loading JSON file");
  }

  const conjugations = await response.json();

  const verbs = conjugations.flatMap((entry: ConjugationEntry) =>
    entry.spanish_meaning.map((spa, index) => ({
      isc_verb: entry.forma_base,
      spa_verb: spa,
      eng_verb: entry.english_meaning[index],
    }))
  );

  const languages: Language[] = [
    { name: "Iskonawa", code: "isc", enabled: true },
    { name: "Español", code: "spa", enabled: true },
    { name: "English", code: "eng", enabled: true },
  ];

  return json({ languages, verbs });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const verb = formData.get("verb");

  invariant(typeof verb === "string", "Verb must be a string");

  return redirect(`/conjugate/${verb}`);
};

export default function Index() {
  const { languages, verbs } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col w-full">
      <HeaderPage
        title={
          <span className="">
            Conjugación de verbos&nbsp;
            <strong className="font-bold">Iskonawa</strong>
          </span>
        }
      />
      <div className="flex flex-col self-center text-left py-12 pb-14 gap-4 font-normal w-5/6 md:w-4/6 text-gray-800">
        <div className="self-center flex w-full max-w-4xl">
          <VerbConjugatorField languages={languages} verbs={verbs} />
        </div>
        <div className="border-t-2 border-gray-300 my-8"></div>

        <strong>Explora la Conjugación del Idioma Iskonawa</strong>
        <p className="">
          Este conjugador de verbos en Iskonawa es una herramienta diseñada para
          apoyar el aprendizaje y preservación de esta lengua amazónica en
          peligro de extinción. Ingresa un verbo en Iskonawa, selecciona el
          contexto gramatical y descubre cómo se conjuga en distintos tiempos,
          modos y aspectos. ¡Sumérgete en la riqueza de este idioma y contribuye
          a mantener viva su herencia cultural!
        </p>
      </div>
    </div>
  );
}
