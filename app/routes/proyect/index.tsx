import HeaderPage from "~/components/HeaderPage";

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
        <p className="">
          El objetivo de este proyecto es desarrollar un prototipo de conjugador
          de verbos para la lengua Iskonawa, una lengua amazónica peruana en
          peligro de extinción. Esta herramienta está diseñada para facilitar el
          aprendizaje, la investigación y la preservación del idioma, utilizando
          tecnologías lingüísticas avanzadas. Al documentar y modelar
          conjugaciones en diversos tiempos, aspectos y modos, el conjugador
          contribuye a la revitalización del Iskonawa y ofrece un recurso
          accesible para hablantes nativos, estudiantes e investigadores.
        </p>
        <p className="">
          El proyecto sigue un enfoque de aprendizaje automático, empleando
          redes neuronales recurrentes para predecir las formas verbales
          inflexionadas a partir de una forma base y parámetros gramaticales
          específicos.
        </p>
        <p className="">
          La interfaz permite a los usuarios ingresar un verbo en Iskonawa y
          obtener de inmediato sus formas conjugadas, promoviendo el uso activo
          del idioma y apoyando su aprendizaje en entornos educativos.{" "}
        </p>
        <p className="">
          Este esfuerzo combina tecnología y lingüística para ayudar a preservar
          la riqueza cultural del Iskonawa, proporcionando una herramienta
          valiosa que puede integrarse en futuras aplicaciones de procesamiento
          de lenguaje natural.
        </p>
      </div>
    </div>
  );
}
