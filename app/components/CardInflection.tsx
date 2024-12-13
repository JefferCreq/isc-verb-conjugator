import clsx from "clsx";
import { Info, MessageSquareWarning } from "lucide-react";
import {
  movementLabels,
  negationLabels,
  otherLabels,
  referenceChangeLabels,
  transitivityLabels,
} from "~/utils/labels";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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

type ConjugationData = {
  inflection: string;
  example: SentenceEntry | null;
  key: string | null;
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

type Props = {
  item: ConjugationData;
  handleReportClick: (item: ConjugationData) => void;
};

export default function CardInflection({ item, handleReportClick }: Props) {
  return (
    <TooltipProvider>
      <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex flex-row w-full justify-between">
          <div
            className={clsx("font-bold text-lg", {
              "text-orange-700": item.key,
              "text-gray-400": !item.key,
            })}
          >
            {item.inflection}
          </div>
          <div className="flex flex-row gap-2 self-center">
            {item.key && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Info className="w-4 h-4 text-[#402A2B]" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm bg-white text-gray-700 p-4 space-y-3 rounded-lg shadow-lg">
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium">
                      {item.example?.spanish_verbs}
                    </h3>
                    <p className="text-gray-600">
                      {item.example?.iskonawa_sentence}
                    </p>
                    <p className="text-gray-600">
                      {item.example?.spanish_sentence}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 italic border-t border-gray-00 pt-2">
                    Forma conjugada obtenida en el libro Bosquejo Gramatical de
                    la Lengua Iskonawa - Roberto Zariquey (2015)
                  </p>
                </TooltipContent>
              </Tooltip>
            )}

            <button onClick={() => handleReportClick(item)}>
              <MessageSquareWarning className="w-4 h-4 text-[#402A2B]" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs text-zinc-700 italic">
          {item.negation && (
            <div>
              <span className="font-semibold">Negación: </span>
              {negationLabels[item.negation as keyof typeof negationLabels] ??
                "-"}
            </div>
          )}
          {item.transitivity && (
            <div>
              <span className="italic">
                {transitivityLabels[
                  item.transitivity as keyof typeof transitivityLabels
                ] ?? "-"}
              </span>
            </div>
          )}
          {item.movement && (
            <div>
              <span className="font-semibold">Movimiento: </span>
              {movementLabels[item.movement as keyof typeof movementLabels] ??
                "-"}
            </div>
          )}
          {item.ref_change && (
            <div>
              <span className="font-semibold">Cambio de Referencia: </span>
              {referenceChangeLabels[
                item.ref_change as keyof typeof referenceChangeLabels
              ] ?? "-"}
            </div>
          )}
          {item.other && (
            <div>
              <span className="italic">
                {otherLabels[item.other as keyof typeof otherLabels] ?? null}
              </span>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
