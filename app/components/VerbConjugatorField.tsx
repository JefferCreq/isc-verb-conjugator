import { Form, useNavigation } from "@remix-run/react";
import Autocomplete from "./Autocomplete";
import { Button } from "./Button";
import LanguageSelect from "~/components/LanguageSelect";
import { useState, useEffect } from "react";
import { Language, Verb } from "~/types/verb";

const styles = {
  input:
    "bg-white flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  dropdown:
    "absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 py-2",
  dropdownItem: "px-4 py-2 hover:bg-gray-100 rounded-lg text-[#1F2328]",
  loader:
    "border-2 border-t-2 border-gray-200 rounded-full w-4 h-4 animate-spin",
};

type Props = {
  verbs: Verb[];
  languages: Language[];
};

export default function VerbConjugatorField({ verbs, languages }: Props) {
  const [verbIsValid, setVerbIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0]
  );
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);
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
      className="flex flex-col gap-3 w-full items-center mt-4"
    >
      <div className="flex flex-col lg:flex-row gap-3 w-full items-start">
        <Autocomplete
          items={verbs}
          styles={styles}
          verbIsValid={verbIsValid}
          setVerbIsValid={setVerbIsValid}
          selectedLanguage={selectedLanguage}
          setSelectedVerb={setSelectedVerb}
          selectedVerb={selectedVerb}
        />
        <div className="flex flex-col md:flex-row gap-3 w-full items-center justify-center">
          <LanguageSelect
            languages={languages}
            styles={styles}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <Button type="submit" disabled={!verbIsValid || isLoading} className="min-h-10">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="loader"></span> Conjugando...
              </div>
            ) : (
              "Conjugate"
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
}
