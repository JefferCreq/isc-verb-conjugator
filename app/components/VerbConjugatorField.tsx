import { Form, useNavigation } from "@remix-run/react";
import Autocomplete from "./Autocomplete";
import { Button } from "./Button";
import LanguageSelect from "~/components/LanguageSelect";
import { useState, useEffect } from "react";

type Language = {
  name: string;
  code: string;
  enabled: boolean;
};

const styles = {
  input:
    "w-full min-h-12 bg-white border rounded-lg px-4 py-2 focus:outline-none \
      border-zinc-200 text-[#1F2328] placeholder:text-[#636C76] placeholder:text-opacity-50",
  dropdown:
    "absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 py-2",
  dropdownItem: "px-4 py-2 hover:bg-gray-100 rounded-lg text-[#1F2328]",
  loader:
    "border-2 border-t-2 border-gray-200 rounded-full w-4 h-4 animate-spin",
};

type Props = {
  verbs: string[];
  languages: Language[];
};

export default function VerbConjugatorField({ verbs, languages }: Props) {
  const [verbIsValid, setVerbIsValid] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const form = document.getElementById("conjugate-verb-form");
    const handleSubmit = () => setIsLoading(true);
    form?.addEventListener("submit", handleSubmit);
    return () => form?.removeEventListener("submit", handleSubmit);
  }, []);

  useEffect(() => {
    if (navigation.state === "idle") {
      setIsLoading(false);
    }
  }, [navigation.state]);

  return (
    <Form
      method="post"
      id="conjugate-verb-form"
      className="flex flex-col gap-3 w-full items-center"
    >
      <div className="flex flex-row gap-4 w-full items-center">
        <Autocomplete
          items={verbs}
          styles={styles}
          setVerbIsValid={setVerbIsValid}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <LanguageSelect languages={languages} styles={styles} />
        <Button type="submit" disabled={!verbIsValid || isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="loader"></span> Conjugando...
            </div>
          ) : (
            "Conjugate"
          )}
        </Button>
      </div>
      <div className="text-sm text-amber-900 italic h-6">
        {inputValue !== "" && !verbIsValid ? "Ingrese un verbo válido." : null}
      </div>
    </Form>
  );
}
