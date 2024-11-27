import { Form } from "@remix-run/react";
import Autocomplete from "./Autocomplete";
import { Button } from "./Button";
import LanguageSelect from "~/components/LanguageSelect";

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
};

type Props = {
  verbs: string[];
  languages: Language[];
};

export default function VerbConjugatorField({ verbs, languages }: Props) {
  return (
    <Form
      method="post"
      id="conjugate-verb-form"
      className="flex flex-row gap-4 w-full items-center"
    >
      <Autocomplete items={verbs} styles={styles} />
      <LanguageSelect languages={languages} styles={styles} />
      <Button type="submit">Conjugate</Button>
    </Form>
  );
}
