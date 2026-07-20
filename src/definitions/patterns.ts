export const URL_PATTERN =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
export const URL_PATTERN_GLOBAL =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
export const VIMEO_PATTERN = /(https:\/\/vimeo.com\/[^"]*)/i;
export const YOUTUBE_PATTERN =
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=[^&\s"]+/i;
export const GDOC_PATTERN = /(?<![-\_\..])\b(673|21|231|89|521|873)\b(?!\.\d)/;
export const DOC_PATTERN =
  /(\.doc|\.docx|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document)$/i;
export const CODE_PATTERN = /\s\([\dA-Za-z]*\)/i;

export const DEFAULT_STAMP_PATTERN = /^\$([^\$]*)\$/i; // $...$...
export const START_STAMP_PATTERN = /^\$0([^$]*)\$/i; // $0...$...
export const END_STAMP_PATTERN = /^\$1([^$]*)\$/i; // $1...$...

export const APRESENTACAO_PATTERN = /APRESENTA[CÇ][AÃ]O/i;
export const ETAPA1_PATTERN = /ETAPA (1|i)/i;
export const ETAPA3_PATTERN = /ETAPA (3|iii)/i;
export const ETAPA4_PATTERN = /ETAPA (4|iv)/i;
export const UNIDADE3_PATTERN = /UNIDADE (3|iii)/i;
export const UNICA_PATTERN = /[UÚ]NICA/i;

export const SPECIAL_CHARS_PATTERN = /[^a-zA-Zà-ž0-9\s_]+/g;
export const SPACES_PATTERN = /[\s]+/g;
export const DIACRITICS_PATTERN = /[\u0300-\u036f]/g;
export const CODE_NUMBER_PATTERN = /^([A-Za-z]*[0-9]+)(?=[a-z])/;

export const STRONG_ELEMENT_PATTERN = /^.{0,3}<strong>.*<\/strong>.{0,2}$/i; // !<strong>...<strong>!

export const BASE64_PATTERN = /^data:image\/(png|jpeg|jpg);base64,/;
