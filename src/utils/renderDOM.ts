import Block from './block';

function renderDOM(rootSelector: string, block: Block) {
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
