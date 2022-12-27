import Block from 'utils/block';

interface IButtonProps {
  title: String;
  classes: String;
  onClick?: () => void;
  onSubmit?: () => void;
}

class Button extends Block {
  static componentName = 'Button';

  constructor({
    title,
    classes,
    onClick,
    onSubmit,
  }: IButtonProps) {
    super({
      title,
      classes,
      events: {
        click: [onClick, onSubmit],
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
