export function normalizeCase(filename: string): string {
  if (/[A-Z]/g.test(filename)) {
    return filename.toLowerCase().trim();
  } else {
    return filename;
  }
}
