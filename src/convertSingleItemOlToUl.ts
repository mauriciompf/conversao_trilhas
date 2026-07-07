export function convertSingleItemOlToUl() {
  const orderedLists = document.querySelectorAll(
    "ol",
  ) as NodeListOf<HTMLOListElement>;

  const singleItemOrderedLists = [...orderedLists].filter(
    (ol) => ol.children.length === 1 && !ol.hasAttribute("class"),
  );

  singleItemOrderedLists.forEach((orderedList) => {
    const listItems = Array.from(orderedList.children);
    const unorderedList = document.createElement("ul") as HTMLUListElement;
    unorderedList.append(...listItems);
    orderedList.replaceWith(unorderedList);
  });
}
