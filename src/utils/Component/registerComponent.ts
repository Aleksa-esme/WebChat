import * as Handlebars from 'handlebars';
import { HelperOptions } from 'handlebars';
import Component from './Component';

function registerComponent(Block: typeof Component) {
  Handlebars.registerHelper(
    Block.componentName || Block.name,
    ({ hash: { ...hash }, data }: HelperOptions) => {
      if (!data.root.children) {
        data.root.children = {};
      }

      const { children } = data.root;

      const component = new Block(hash);

      children[component.id] = component;

      return `<div data-id="id-${component.id}"></div>`;
    },
  );
}

export default registerComponent;
