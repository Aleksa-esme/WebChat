const showBlock = (selector: string): void => {
  const element = document.querySelector(selector);
  element!.classList.toggle('show');
};

export default showBlock;
