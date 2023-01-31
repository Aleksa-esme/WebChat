import Component from 'utils/Component/Component';

interface IButtonProps {
  title: String;
  classes?: String;
  onClick?: () => void;
}

class Button extends Component {
  static componentName = 'Button';

  constructor({
    title,
    classes,
    onClick,
  }: IButtonProps) {
    super({
      title,
      classes,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <button type='submit' class='{{ classes }}'>
        {{ title }}
      </button>
    `;
  }
}

export default Button;
