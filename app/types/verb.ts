export type ConjugationEntry = {
  forma_base: string;
  inflections: Array<{
    inflection: string;
    key: string | null;
    mood: string;
    tense: string;
    aspect: string;
    number: string;
  }>;
  spanish_meaning: string[];
  english_meaning: string[];
};

export type Language = {
  name: string;
  code: string;
  enabled: boolean;
};

export type Verb = {
  isc_verb: string;
  spa_verb: string;
  eng_verb: string;
};

export type SentenceEntry = {
  index: string;
  iskonawa_sentence: string;
  suffix_sentence: string;
  annotated_sentence: string;
  spanish_sentence: string;
  reference: string;
  key: string;
  spanish_verbs: string;
};
