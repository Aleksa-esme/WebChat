import Handlebars from 'handlebars/dist/handlebars.runtime';
// import { HelperOptions } from 'handlebars';
// import Block from './block.js';

// interface BlockConstructable<Props = any> {
//     new(props: Props): Block;
//   }

function registerComponent(Component) {
  Handlebars.registerHelper(Component.name, ({ hash: { ...hash }, data }) => {
    if (!data.root.children) {
      data.root.children = {};
    }

    if (!data.root.refs) {
      data.root.refs = {};
    }

    const { children } = data.root;

    const component = new Component(hash);

    children[component.id] = component;

    return `<div data-id="id-${component.id}"></div>`;
  });
}

export default registerComponent;
