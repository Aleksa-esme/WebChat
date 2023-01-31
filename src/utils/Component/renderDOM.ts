import Component from './Component';

function renderDOM(component: Component) {
  const root = document.querySelector('#app');

  if (!root) {
    throw new Error('Root not found');
  }

  component.dispatchComponentDidMount();

  root.innerHTML = '';

  root.appendChild(component.getContent());
}

export default renderDOM;
