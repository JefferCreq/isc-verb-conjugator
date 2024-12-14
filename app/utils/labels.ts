export const moodLabels = {
  IND: "Indicativo",
  IMP: "Imperativo",
  DUB: "Dubitativo",
  ASER: "Asertivo",
  DES: "Desiderativo",
  HAB_M: "Habitivo",
//   undefined_mood: "Indicativo",
};

export const tenseLabels = {
  "PRS/FUT": "Presente/Futuro",
  PRS: "Presente",
  PST: "Pasado",
  FUT: "Futuro",
  "DUR.mismo.día": "Durativo mismo día",
  "FUT.INM": "Futuro inmediato",
  "PST.REM": "Pasado remoto",
  "PST.REM.DUR": "Pasado remoto durativo",
  "PST.REM.HAB": "Pasado remoto habitual",
  "PST.yesterday": "Pasado (ayer)",
  "PST.days": "Pasado (hace días)",
  "PST.yet": "Todavía (en curso)",
  "PST.DUR": "El mismo día, durativo",
  //   undefined_tense: "Presente/Futuro",
};

export const aspectLabels = {
  PFV: "Perfectivo",
  IPFV: "Imperfectivo",
  EST: "Estativo",
  HAB_A: "Habitual",
  PRG: "Progresivo",
//   undefined_aspect: "No especificado",
};

export const numberLabels = {
  "PLU/SG": "Singular/Plural",
  SG: "Singular",
  PL: "Plural",
  DUAL: "Dual",
  //   undefined_number: "Singular/Plural",
};

export const negationLabels = {
  "NEG.FRUS": "Frustrativo",
  NEG: "Negativo",
  "NEG.never": "Nunca",
  "NEG.yet": "Todavía no",
};

export const transitivityLabels = {
  TR: "Transitivo",
  INTR: "Intransitivo",
};

export const movementLabels = {
  "MOV.ANDA": "Andativo",
  "MOV.DUR": "Durativo",
  "MOV.ITER": "Iterativo",
  "MOV.VEN": "Venitivo",
  "MOV.around": "Dando vuelta",
  "MOV.goto": "Ir a",
  "MOV.passing": "Pasando",
  "MOV.up": "Subiendo",
  "MOV.down": "Bajando",
  "MOV.arrive": "Llegar a",
};

export const referenceChangeLabels = {
  "REF.S/A>A": "Sujeto/Agente > Agente",
  "REF.S/A>S": "Sujeto/Agente > Sujeto",
};

export const otherLabels = {
  ASOC: "Asociativo",
  BEN: "Benefactivo",
  CAU: "Causativo",
  DIM: "Diminutivo",
  ENF: "Enfático",
  MAL: "Malintencionado",
  REC: "Recíproco",
};

export const allLabels = {
  ...moodLabels,
  ...tenseLabels,
  ...aspectLabels,
  ...numberLabels,
  ...negationLabels,
  ...transitivityLabels,
  ...movementLabels,
  ...referenceChangeLabels,
  ...otherLabels,
};
