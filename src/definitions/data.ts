import {
  APRESENTACAO_PATTERN,
  ETAPA1_PATTERN,
  ETAPA3_PATTERN,
  ETAPA4_PATTERN,
  UNIDADE3_PATTERN,
} from "./patterns";
import type { TypeConfigs } from "./types";

export const TYPE_CONFIGS: TypeConfigs[] = [
  {
    pattern: {
      first: APRESENTACAO_PATTERN,
      last: ETAPA4_PATTERN,
    },
    label: "Apresentação + 4 etapas",
  },
  {
    pattern: {
      first: APRESENTACAO_PATTERN,
      last: ETAPA3_PATTERN,
    },
    label: "Apresentação + 3 etapas",
  },
  {
    pattern: {
      first: ETAPA1_PATTERN,
      last: ETAPA4_PATTERN,
    },
    label: "4 Etapas (sem apresentação)",
  },
  {
    pattern: {
      first: APRESENTACAO_PATTERN,
      last: UNIDADE3_PATTERN,
    },
    label: "Apresentação + 3 unidades",
  },
];
