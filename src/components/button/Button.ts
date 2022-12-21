import Block from 'utils/Block';

interface IButtonProps {
  title: String;
  classes: String;
  onClick?: () => void;
}

class Button extends Block {
  static componentName = 'Button';

  constructor({ title, classes, onClick }: IButtonProps) {
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
      <button type="submit" class="button {{ classes }}">
          {{ title }}
      </button>
    `;
  }
}

export default Button;
