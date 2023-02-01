import Component from '../Component';

describe('Component', () => {
  it('should init with props', () => {
    const component = new Component({ prop: 'prop' });

    expect(component.getProps()).toEqual({ prop: 'prop' });
  });

  it('should set new props', () => {
    const component = new Component({ prop: 'prop' });

    const props = { prop: 'newProp' };

    component.setProps(props);

    expect(component.getProps()).toEqual({ prop: 'newProp' });
  });

  it('should return Document Fragment', () => {
    const component = new Component({});
    const template = '<p>Test</p>';
    const props = { prop: 'prop' };

    const fragment = component.compile(template, props);

    expect(fragment).toBeInstanceOf(DocumentFragment);
  });

  it('should render Component with props', () => {
    class NewComponent extends Component {
      render() {
        return '<p>{{ text }}</p>';
      }
    }

    const props = { text: 'Test' };
    const component = new NewComponent(props);
    const text = component.getContent().textContent;

    expect(text).toEqual('Test');
  });
});
