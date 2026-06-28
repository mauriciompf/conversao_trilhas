export const urlPattern =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
export const vimeoPattern = /(https:\/\/vimeo.com\/[^"]*)/i;
export const youtubePattern = /(https?:\/\/www\.youtube\.com\/watch\?[^"]*)/i;
export const gDocPattern = /673|21|231|89|521|873/;
export const docPattern =
  /(\.doc|\.docx|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document)$/i;
export const codePattern = /\s\([\dA-Za-z]*\)/i;
