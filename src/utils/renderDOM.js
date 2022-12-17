// import Block from "./block";

// block: Block
function renderDOM(rootSelector, block) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error('Root not found');
  }

  block.dispatchComponentDidMount();

  root.innerHTML = '';

  root.append(block.getContent());

  // return root;
}

export default renderDOM;
