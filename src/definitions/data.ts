import {
  APRESENTACAO_PATTERN,
  ETAPA1_PATTERN,
  ETAPA3_PATTERN,
  ETAPA4_PATTERN,
  UNIDADE3_PATTERN,
} from "./patterns";
import type { TypeConfigs } from "./types";

export const SECTION_NAME_DEFAULT_LIST: string[] = [
  "inicio",
  "objetos",
  "videos",
];

export const TYPE_CONFIGS: TypeConfigs[] = [
  {
    id_name: "placeholder_4etapas",
    pattern: {
      first: APRESENTACAO_PATTERN,
      last: ETAPA4_PATTERN,
    },
    label: "Apresentação + 4 etapas",
    sections: [
      "inicio",
      "apresentacao",
      "etapa_i",
      "etapa_ii",
      "etapa_iii",
      "etapa_iv",
    ],
  },
  {
    id_name: "placeholder_3etapas",
    pattern: {
      first: APRESENTACAO_PATTERN,
      last: ETAPA3_PATTERN,
    },
    label: "Apresentação + 3 etapas",
    sections: ["inicio", "apresentacao", "etapa_i", "etapa_ii", "etapa_iii"],
  },
  {
    id_name: "placeholder_etapas",
    pattern: {
      first: ETAPA1_PATTERN,
      last: ETAPA4_PATTERN,
    },
    label: "4 Etapas (sem apresentação)",
    sections: ["inicio", "etapa_i", "etapa_ii", "etapa_iii", "etapa_iv"],
  },
  {
    id_name: "placeholder_3unidades",
    pattern: {
      first: APRESENTACAO_PATTERN,
      last: UNIDADE3_PATTERN,
    },
    label: "Apresentação + 3 unidades",
    sections: ["inicio", "apresentacao", "unidade1", "unidade2", "unidade3"],
  },
];

export const EXCLUDED_TAGS = [
  "IMG",
  "INPUT",
  "BR",
  "HR",
  "META",
  "LINK",
  "SCRIPT",
  "IFRAME",
  "TD",
  "TH",
  "A",
];

export const TEXTS_TO_REMOVE = [
  "ponto",
  "Bons estudos!",
  "Bons estudos",
  "BONS ESTUDOS E ATÉ A PRÓXIMA!",
  "BONS ESTUDOS E ATÉ A PRÓXIMA",
  "Bom trabalho!",
  "Bom trabalho",
  "Bom trabalho e até a próxima!",
  "Bom trabalho e até a próxima",
];
