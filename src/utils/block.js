import { nanoid } from 'nanoid';
import EventBus from './event-bus';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  id = nanoid(6);

  _element = null;

  _meta = null;

  // constructor(name, propsAndChildren = {}) {
  constructor(propsAndChildren = {}) {
    const eventBus = new EventBus();

    // this.name = name;

    const { props, children } = this.getChildren(propsAndChildren);

    this.children = children;

    // this.initChildren();

    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props); // protected

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  // get componentName() {
  //   return this._name;
  // }

  // set componentName(value) {
  //   this._name = value;
  // }

  getChildren(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every(v => (v instanceof Block))) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { props, children };
  }

  // // protected
  // initChildren() {}

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    // this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    // this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    // const response = this.componentDidUpdate(oldProps, newProps);
    // this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    // return response;
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();

    // const newElement = fragment.firstElementChild as HTMLElement;
    const newElement = fragment.firstElementChild;

    if (this._element) { // если не первый рендер
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  render() {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        // if (prop.indexOf('_') === 0) {
        //   throw new Error('Нет прав');
        // }
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        // if (prop.indexOf('_') === 0) {
        //   throw new Error('Нет прав');
        // }
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        // if (prop.indexOf('_') === 0) {
        throw new Error('Нет прав');
        // }
        // delete target[prop];
        // return true;
      },
    });
  }

  _removeEvents() {
    // переписать удаление эвента, пока не работает, предыдущее событие остается в компоненте
    const events = (this.props).events;

    if (!events || !this.element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element.removeEventListener(event, listener);
      // this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events = (this.props).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element.addEventListener(event, listener);
      // this._element!.addEventListener(event, listener);
    });
  }

  _createDocumentElement(tagName) {
    return document.createElement(tagName);
  }

  // template: (context: any) => string, context: any
  compile(template, context) {
    // const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const fragment = this._createDocumentElement('template');

    // Object.entries(this.children).forEach(([key, child]) => {
    //   if (Array.isArray(child)) {
    //     context[key] = child.map((ch => `<div data-id="id-${ch.id}"></div>`));
    //   }

    //   context[key] = `<div data-id="id-${child.id}"></div>`;
    // });

    const htmlString = template({ ...context, children: this.children });
    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }
}

export default Block;
