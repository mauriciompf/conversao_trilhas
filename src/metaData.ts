export function getMetadata(host: HTMLElement) {
  const firstElementTable = host.firstElementChild as HTMLTableElement;
  console.log();

  const headingCollection = tableToJson(firstElementTable); // Converter to JSON

  return headingCollection;
}
