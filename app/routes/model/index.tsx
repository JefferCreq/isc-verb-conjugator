import { LinkButton } from "~/components/Button";
import HeaderPage from "~/components/HeaderPage";
// import NavBar from "~/components/NavBar";

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
        <p className="">
          Este conjugador de verbos en Iskonawa utiliza un modelo avanzado de
          redes neuronales recurrentes (<strong>RNN</strong>), elegido por su
          capacidad de capturar patrones complejos en secuencias de datos. Esta
          característica es esencial para manejar la estructura aglutinativa del
          Iskonawa, donde los verbos cambian considerablemente según el tiempo,
          modo, aspecto, número y negación.
        </p>
        <p className="">
          El modelo fue entrenado con datos de verbos conjugados en diversos
          contextos gramaticales, obtenidos directamente del corpus disponible
          en Iskonawa. Su objetivo es predecir las formas conjugadas de un verbo
          en su forma base, ajustándose a los parámetros gramaticales
          seleccionados por el usuario.
        </p>
        <p className="">
          Para evaluar la precisión del modelo, se utilizan dos métricas:
          <ul className="list-disc pl-4">
            <li>
              <strong>Exactitud de Coincidencia Exacta:</strong> mide la
              precisión en la predicción del verbo conjugado completo.
            </li>
            <li>
              <strong>Distancia de Levenshtein:</strong> analiza la diferencia
              entre la predicción y la conjugación real, permitiendo una
              evaluación detallada de los errores.
            </li>
          </ul>
        </p>
        <p className="">
          Esta herramienta en desarrollo busca apoyar el aprendizaje y la
          preservación de la lengua Iskonawa, permitiendo visualizar
          conjugaciones verbales en diferentes contextos.
        </p>

        {/* Linea horizontal */}
        <div className="border-t-2 border-gray-300 my-8"></div>
        <strong>¡Contribuye al Corpus de Iskonawa!</strong>
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          <p className="">
            Para mejorar continuamente el modelo, puedes aportar nuevos ejemplos
            de oraciones o conjugaciones en Iskonawa. Simplemente haz clic en el
            botón de abajo para abrir un formulario de carga. Cada contribución
            será validada y, una vez aprobada, se integrará al corpus de datos,
            enriqueciendo el modelo y fortaleciendo la base de conocimientos de
            esta herramienta.
          </p>
          <LinkButton to={"/model/contribute"}>Contribuir</LinkButton>
        </div>
      </div>
    </div>
  );
}
