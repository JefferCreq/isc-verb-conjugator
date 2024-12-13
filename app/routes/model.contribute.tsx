import { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { X } from "lucide-react";
import { useState } from "react";
import { GrDocumentCsv, GrDocumentTxt } from "react-icons/gr";
import { Button } from "~/components/Button";
import HeaderPage from "~/components/HeaderPage";
import { Input } from "~/components/Input";
import { Textarea } from "~/components/TextArea";

export const meta: MetaFunction = () => {
  return [
    { title: "¡Contribuye al Corpus de Iskonawa!" },
    {
      name: "description",
      content: "¡Contribuye al Corpus de Iskonawa!",
    },
  ];
};

interface FileItem {
  name: string;
}

export default function ContributePage() {
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files)
      .filter((file) => /\.(csv|tsv|txt)$/i.test(file.name))
      .map((file) => ({
        name: file.name,
      }));
    setSelectedFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
        .filter((file) => /\.(csv|tsv|txt)$/i.test(file.name))
        .map((file) => ({
          name: file.name,
        }));
      setSelectedFiles(files);
    }
  };

  const removeFile = (fileName: string) => {
    setSelectedFiles((files) => files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="flex flex-col w-full">
      <HeaderPage
        title={
          <span>
            <strong className="font-bold">Modelo&nbsp;</strong>de Conjugación
            Verbal del&nbsp;<strong className="font-bold">Iskonawa</strong>
            <br />
            <span className="text-2xl">¡Contribuye al Corpus de Iskonawa!</span>
          </span>
        }
      />
      <div className="flex flex-col self-center text-left py-14 gap-4 font-normal w-5/6 md:w-4/6 text-gray-800">
        <strong>¡Contribuye al Corpus de Iskonawa!</strong>
        <p>
          <strong>Formato Requerido para Ejemplos</strong>
        </p>
        <p>
          Asegúrate de que tus ejemplos sigan el formato de una glosa
          interlineal, con los siguientes elementos:
        </p>
        <ul className="list-disc pl-4">
          <li>
            <strong>Oración en Iskonawa:</strong> Escribe la oración completa en
            Iskonawa.
          </li>
          <li>
            <strong>
              Oración en Iskonawa Segmentada Morfológicamente (Opcional):
            </strong>{" "}
            Divide la oración en morfemas separados para una mayor claridad.
          </li>
          <li>
            <strong>Glosa Morfema a Morfema:</strong> Traduce cada morfema en
            español, indicando su significado o función. Ejemplo: rete=matar,
            a=PERF.
          </li>
          <li>
            <strong>Traducción Libre:</strong> Proporciona la traducción de la
            oración completa en español, con un sentido natural y contextual.
          </li>
        </ul>
        <p>
          <strong>Ejemplo de Formato:</strong>
        </p>

        <div className="flex flex-col gap-4 w-full items-center">
          <div className="flex flex-col gap-1 bg-white max-w-[80rem] rounded-lg p-4">
            <p>
              <span className="italic">Oración en Iskonawa:</span>{" "}
              <strong>Yawá imata Germanin retea</strong>
            </p>
            <p>
              <span className="italic">
                Oración en Iskonawa Segmentada{" "}
                <span className="text-gray-500">(Opcional)</span>:
              </span>{" "}
              <strong>yawá imata German-nin rete-a</strong>
            </p>
            <p>
              <span className="italic">Glosa Morfema a Morfema:</span>{" "}
              <strong>sachavaca flaco Germán-ERG matar-PERF</strong>
            </p>
            <p>
              <span className="italic">Traducción Libre:</span>{" "}
              <strong>{'"Germán mató una sachavaca flaca"'}</strong>
            </p>
          </div>
        </div>

        <p>
          <strong>Formato de Archivo Aceptado</strong>
        </p>
        <p>
          Puedes subir el archivo en formato <strong>TXT</strong> o{" "}
          <strong>CSV</strong>, con la siguiente estructura:
        </p>
        <ul className="list-disc pl-4">
          <li>
            <strong>TXT:</strong> Cada ejemplo en una nueva línea, separado por
            tabuladores o comas, en el siguiente orden: Oración en Iskonawa,
            Oración Segmentada (Opcional), Glosa Morfema a Morfema, Traducción
            Libre.
          </li>
          <li>
            <strong>CSV:</strong> Utiliza columnas con encabezados:
            Iskonawa_Sentence, Segmented_Sentence, Gloss, Translation. Los
            encabezados ayudan a mantener el orden de los elementos y asegurar
            la consistencia en el formato.
          </li>
        </ul>

        {/* Linea horizontal */}
        <div className="border-t-2 border-gray-300 my-8"></div>

        <div className="flex w-full justify-center">
          <div className="w-full max-w-3xl self-center">
            <div>
              <div className="text-xl font-semibold mb-2">
                Formulario de Carga de Ejemplos al Corpus de Iskonawa
              </div>
            </div>
            <div className="">
              <Form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="fullName">
                      Nombre completo <span className="text-orange-600">*</span>
                    </label>
                    <Input
                      id="fullName"
                      required
                      placeholder="Jefferson Castro"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email">
                      Email <span className="text-orange-600">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="jefferson.castro@pucp.edu.pe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description">Descripción del archivo</label>
                  <Textarea
                    id="description"
                    placeholder="Ejemplos de oraciones en Iskonawa en tiempo pasado con enfoque en verbos intransitivos."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="files">
                    Seleccionar archivos{" "}
                    <span className="text-orange-600">*</span>
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-2">
                      <p>Arrastre los archivos aquí para añadirlos</p>
                      <span className="text-sm text-muted-foreground">
                        o
                      </span>{" "}
                      <label className="cursor-pointer text-primary hover:text-primary/80">
                        <span className="text-orange-600 underline">
                          seleccione sus archivos
                        </span>
                        <input
                          type="file"
                          id="files"
                          multiple
                          accept=".csv,.tsv,.txt"
                          className="hidden"
                          onChange={handleFileInput}
                        />
                      </label>
                    </div>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {selectedFiles.map((file) => (
                        <div
                          key={file.name}
                          className="flex gap-2 items-center justify-between border border-gray-300 p-2 rounded-md"
                        >
                          {file.name.endsWith(".csv") ? (
                            <GrDocumentCsv className="h-5 w-5 text-gray-500" />
                          ) : file.name.endsWith(".tsv") ? (
                            <GrDocumentTxt className="h-5 w-5 text-gray-500" />
                          ) : (
                            <GrDocumentTxt className="h-5 w-5 text-gray-500" />
                          )}
                          <span className="text-sm truncate w-full">
                            {file.name}
                          </span>
                          <button onClick={() => removeFile(file.name)}>
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="source">Fuentes</label>{" "}
                  <span className="text-sm text-muted-foreground italic text-gray-500">
                    - Detalle de donde fueron extraídos los ejemplos.
                  </span>
                  <Input
                    id="source"
                    placeholder="Bosquejo Gramatical de la Lengua Iskonawa - Roberto Zariquey (2015)"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button>Cancelar</Button>
                  <Button type="submit">Enviar</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
