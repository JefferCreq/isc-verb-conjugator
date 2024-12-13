import { MetaFunction } from "@remix-run/react";
import HeaderPage from "~/components/HeaderPage";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "Proyecto: Implementación de un prototipo de conjugación de verbos para Iskonawa",
    },
    {
      name: "description",
      content:
        "Proyecto: Implementación de un prototipo de conjugación de verbos para Iskonawa",
    },
  ];
};

export default function ProyectIndex() {
  return (
    <div className="flex flex-col w-full">
      <HeaderPage
        title={
          <span>
            <strong className="font-bold">Proyecto: &nbsp;</strong>
            Implementación de un prototipo de conjugación de verbos para&nbsp;
            <strong className="font-bold">Iskonawa</strong>
          </span>
        }
      />
      <div className="flex flex-col self-center text-left py-14 gap-4 font-normal w-5/6 md:w-4/6 text-gray-800">
        <h2 className="text-xl font-bold">
          Proyecto Finalizado: Una Herramienta Innovadora para la Preservación
          del Iskonawa
        </h2>
        <p>
          El{" "}
          <strong>
            Proyecto de Implementación de un Prototipo de Conjugación de Verbos
            para Iskonawa
          </strong>{" "}
          ha culminado con éxito, entregando una solución tecnológica avanzada
          que contribuye significativamente a la documentación, preservación y
          revitalización de esta lengua indígena amazónica en peligro de
          extinción.
        </p>
        <p>
          Con el desarrollo de este prototipo, hemos dado un paso fundamental
          hacia el fortalecimiento del estudio del Iskonawa y su integración en
          aplicaciones modernas de procesamiento de lenguaje natural (NLP).
        </p>

        <h3 className="text-lg font-semibold">Logros del Proyecto</h3>
        <ol className="list-decimal pl-6">
          <li>
            <strong>Base de Datos Exhaustiva de Verbos</strong>
            <p>
              Se creó una base de datos con más de 465 verbos documentados, de
              los cuales 60 cuentan con formas flexionadas. Cada entrada
              incluye:
            </p>
            <ul className="list-disc pl-4">
              <li>Traducciones al español e inglés.</li>
              <li>
                Anotaciones detalladas de tiempo, aspecto, modo, número y
                negación.
              </li>
              <li>Contextos de uso extraídos de textos de referencia.</li>
            </ul>
          </li>
          <li>
            <strong>Modelos de Conjugación Automatizada</strong>
            <p>
              Se implementaron y evaluaron modelos de aprendizaje automático,
              incluyendo:
            </p>
            <ul className="list-disc pl-4">
              <li>Redes neuronales recurrentes (RNN) con atención.</li>
              <li>
                Modelos preentrenados como mBART-50, adaptados para Iskonawa. El
                modelo final,{" "}
                <a
                  className="underline"
                  href="https://huggingface.co/JefferCreq/M2M-ISCVerbInflector-AveragedFold"
                >
                  <strong>JefferCreq/M2M-ISCVerbInflector-AveragedFold</strong>
                </a>
                alcanzó un rendimiento destacado, con una Exact Match Accuracy
                del 73.8% y una Distancia de Levenshtein Media de 0.86.
              </li>
            </ul>
          </li>
          <li>
            <strong>Interfaz de Usuario Accesible</strong>
            <p>Se diseñó una interfaz web que permite a los usuarios:</p>
            <ul className="list-disc pl-4">
              <li>
                Introducir un verbo en Iskonawa y visualizar sus conjugaciones.
              </li>
              <li>
                Explorar las formas flexionadas en diferentes categorías
                gramaticales.
              </li>
              <li>Acceder a traducciones en español e inglés.</li>
            </ul>
          </li>
        </ol>

        <h3 className="text-lg font-semibold">Impacto del Proyecto</h3>
        <p>
          Este proyecto representa un hito en la documentación lingüística del
          Iskonawa, permitiendo:
        </p>
        <ul className="list-disc pl-4">
          <li>
            <strong>Preservación Cultural:</strong> Fortalecer el legado
            lingüístico de la comunidad Iskonawa.
          </li>
          <li>
            <strong>Soporte Educativo:</strong> Facilitar el aprendizaje del
            idioma para hablantes nativos, investigadores y aprendices.
          </li>
          <li>
            <strong>Avances Tecnológicos:</strong> Proporcionar un recurso
            abierto para aplicaciones de NLP y futuras investigaciones
            lingüísticas.
          </li>
        </ul>

        <h3 className="text-lg font-semibold">Reflexión y Futuro</h3>
        <p>
          El éxito de este proyecto abre la puerta a futuras investigaciones y
          desarrollos. La ampliación del corpus de datos y la adaptación de
          tecnologías más avanzadas podrían fortalecer aún más la revitalización
          del Iskonawa y otras lenguas indígenas.
        </p>
      </div>
    </div>
  );
}
