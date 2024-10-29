import type { MetaFunction } from "@remix-run/node";
import HeaderPage from "~/components/HeaderPage";
import InputField from "~/components/InputField";

export const meta: MetaFunction = () => {
  return [
    { title: "Iskonawa Verb Conjugator" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
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
      <div className="flex flex-col self-center text-left py-14 gap-4 font-normal w-5/6 md:w-4/6 text-gray-800">
        <InputField />
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
