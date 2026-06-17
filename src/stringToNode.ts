export function stringToNode(html: string) {
  const template = document.createElement("template") as HTMLTemplateElement;
  template.innerHTML = html;
  return template.content;
}
