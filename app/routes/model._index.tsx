import { Button } from "~/components/Button";
// import { LinkButton } from "~/components/Button";
import HeaderPage from "~/components/HeaderPage";

export default function ModelIndex() {
  return (
    <div className="flex flex-col w-full">
      <HeaderPage
        title={
          <span>
            <strong className="font-bold">Modelo&nbsp;</strong>de Conjugación
            Verbal del&nbsp;<strong className="font-bold">Iskonawa</strong>
          </span>
        }
      />
      <div className="flex flex-col self-center text-left py-14 gap-4 font-normal w-5/6 md:w-4/6 text-gray-800">
        <p>
          El <strong>Modelo de Conjugación Verbal del Iskonawa</strong> es una
          solución tecnológica desarrollada para documentar, preservar y
          revitalizar esta lengua indígena en peligro de extinción. Utilizando
          el modelo{" "}
          <a className="underline" href="https://huggingface.co/JefferCreq/M2M-ISCVerbInflector-AveragedFold">
            <strong>JefferCreq/M2M-ISCVerbInflector-AveragedFold</strong>
          </a>
          , esta herramienta aprovecha técnicas avanzadas de procesamiento de
          lenguaje natural (NLP) y aprendizaje automático para generar
          conjugaciones verbales precisas, respetando la complejidad gramatical
          y morfológica del Iskonawa.
        </p>
        <p>
          Este modelo combina datos reales y sintéticos, entrenándose con 160
          conjugaciones reales y más de 4,800 datos sintéticos generados (30
          veces los datos reales) mediante reglas gramaticales específicas. Fue
          ajustado usando el modelo preentrenado{" "}
          <strong>
            mBART-50 Many-to-Many Multilingual Machine Translation
          </strong>
          , alcanzando un desempeño destacado con una{" "}
          <strong>Exact Match Accuracy</strong> del 73.8% y una{" "}
          <strong>Distancia de Levenshtein Media</strong> de 0.86.
        </p>
        <p>
          Entre sus características principales se incluyen:
          <ul className="list-disc pl-4">
            <li>
              <strong>Cobertura gramatical:</strong>
              Este modelo captura las siguientes categorías gramaticales del
              idioma Iskonawa:
              <ul className="list-disc pl-6">
                <li>
                  <strong>Modos:</strong> Indicativo, Imperativo, Dubitativo,
                  Asertivo, Desiderativo, Habitivo.
                </li>
                <li>
                  <strong>Tiempos:</strong> Presente, Pasado, Futuro, Durativo
                  mismo día, Futuro inmediato, Pasado remoto, Pasado remoto
                  durativo, Pasado remoto habitual, Pasado (ayer), Pasado (hace
                  días), Todavía en curso, El mismo día durativo.
                </li>
                <li>
                  <strong>Aspectos:</strong> Perfectivo, Imperfectivo, Estativo,
                  Habitual, Progresivo.
                </li>
                <li>
                  <strong>Número:</strong> Singular, Plural, Dual.
                </li>
                <li>
                  <strong>Negación:</strong> Frustrativo, Negativo, Nunca,
                  Todavía no.
                </li>
                <li>
                  <strong>Transitividad:</strong> Transitivo, Intransitivo.
                </li>
                <li>
                  <strong>Movimiento:</strong> Andativo, Durativo, Iterativo,
                  Venitivo, Dando vuelta, Ir a, Pasando, Subiendo, Bajando,
                  Llegar a.
                </li>
                <li>
                  <strong>Cambio de Referencia:</strong> Cambio de referencia
                  hacia el agente, Cambio de referencia hacia el sujeto.
                </li>
                <li>
                  <strong>Otros:</strong> Asociativo, Benefactivo, Causativo,
                  Diminutivo, Enfático, Malintencionado, Recíproco.
                </li>
              </ul>
            </li>
            <li>
              <strong>Multilingüismo:</strong> Cada verbo conjugado está
              acompañado de su traducción en español e inglés, facilitando el
              entendimiento para diferentes públicos.
            </li>
          </ul>
        </p>
        <p>
          Este modelo es más que una herramienta lingüística: es un puente entre
          el pasado y el futuro del Iskonawa, promoviendo su uso activo y
          asegurando su continuidad en la era moderna.
        </p>

        {/* Linea horizontal */}
        <div className="border-t-2 border-gray-300 my-8"></div>
        <strong>¡Contribuye al Corpus de Iskonawa!</strong>
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          <p>
            Para mejorar continuamente el modelo, puedes aportar nuevos ejemplos
            de oraciones o conjugaciones en Iskonawa. Simplemente haz clic en el
            botón de abajo para abrir un formulario de carga. Cada contribución
            será validada y, una vez aprobada, se integrará al corpus de datos,
            enriqueciendo el modelo y fortaleciendo la base de conocimientos de
            esta herramienta.
          </p>

          <Button
            // to={"/model/contribute"}
            disabled
          >
            Contribuir
          </Button>
        </div>
      </div>
    </div>
  );
}
