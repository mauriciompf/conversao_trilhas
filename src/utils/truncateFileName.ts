export function truncateFileName(
  filename: string,
  length: "short" | "default",
): string {
  if (length !== "short") return filename;

  const parts = filename.split("_");
  const maxIndex =
    filename.includes("_trabalho") || filename.includes("_ensino") ? 3 : 2;

  return parts.slice(0, maxIndex + 1).join("_");
}
