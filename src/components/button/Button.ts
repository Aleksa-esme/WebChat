import Component from 'utils/Component/Component';

interface IButtonProps {
  type?: String;
  title: String;
  classes?: String;
  onClick?: () => void;
}

class Button extends Component {
  static componentName = 'Button';

  constructor({
    type = 'submit',
    title,
    classes,
    onClick,
  }: IButtonProps) {
    super({
      type,
      title,
      classes,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <button type='{{ type }}' class='{{ classes }}'>
        {{ title }}
      </button>
    `;
  }
}

export default Button;
