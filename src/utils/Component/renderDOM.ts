import Block from './Block';

function renderDOM(block: Block) {
  const root = document.querySelector('#app');

  if (!root) {
    throw new Error('Root not found');
  }

  block.dispatchComponentDidMount();

  root.innerHTML = '';

  root.appendChild(block.getContent());
}

export default renderDOM;
