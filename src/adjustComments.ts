export function adjustComments() {
  const dt = document.querySelectorAll("dt") as NodeListOf<HTMLElement>;

  [...dt]
    .filter((element) => /ME/g.test(element.textContent))
    .forEach((element) => {
      element.nextElementSibling?.remove();
      element.remove();
    });
}
