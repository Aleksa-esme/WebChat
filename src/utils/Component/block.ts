import { nanoid } from 'nanoid';
import * as Handlebars from 'handlebars';
import isEqual from 'utils/helpers/isEqual';
import EventBus from './EventBus';

type Props = Record<string, any>;
type Events = Record<string, () => void>;

export interface BlockClass<P> extends Function {
  new (props: P): Props;
  componentName?: string;
}

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  } as const;

  static componentName: string;

  public id = nanoid(6);

  private _element: HTMLElement | null = null;

  private _meta: { props: Props };

  protected props: Props;

  protected children: Record<string, Block>;

  private eventBus: () => EventBus;

  constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      props,
    };

    this.props = props;

    this.initChildren();

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  getChildren(propsAndChildren: any) {
    const children: any = {};
    const props: Props = {};

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

  protected initChildren() {}

  _checkInDOM() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDOM(), 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  componentWillUnmount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  setProps = (nextPartialProps: Props) => {
    if (!nextPartialProps) {
      return;
    }

    const prevProps = this.props;
    const nextProps = { ...prevProps, ...nextPartialProps };

    this.props = nextProps;

    if (isEqual(prevProps, nextProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
    }
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  _render() {
    const templateString = this.render();

    const fragment = this.compile(templateString, { ...this.props });
    this._removeEvents();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) { // если не первый рендер
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  _removeEvents() {
    const events: Events = (this.props as Props).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Events = (this.props as Props).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (Array.isArray(listener)) {
        listener.map(handler => this._element!.addEventListener(event, handler));
      }
      this._element!.addEventListener(event, listener);
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  compile(templateString: string, context: any) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    const template = Handlebars.compile(templateString);

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
