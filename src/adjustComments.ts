export function adjustComments() {
  const docComments = document.querySelectorAll(
    "dt",
  ) as NodeListOf<HTMLElement>;

  // Remove 'sub doc comments'
  [...docComments]
    .filter((docComment) => /ME|CG/g.test(docComment.textContent))
    .forEach((docComment) => {
      const commentText = docComment.nextElementSibling as HTMLElement;
      commentText.remove();
      docComment.remove();
    });
}
