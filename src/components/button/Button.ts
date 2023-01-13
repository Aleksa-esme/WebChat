import Block from 'utils/block';

interface IButtonProps {
  title: String;
  classes?: String;
  onClick?: () => void;
  onSubmit?: () => void;
  onNavigate?: () => void;
}

class Button extends Block {
  static componentName = 'Button';

  constructor({
    title,
    classes,
    onClick,
    onSubmit,
    onNavigate,
  }: IButtonProps) {
    super({
      title,
      classes,
      events: {
        click: [onClick, onSubmit, onNavigate],
      },
    });
  }

  render() {
    return `
      <button type="submit" class="{{ classes }}">
          {{ title }}
      </button>
    `;
  }
}

export default Button;
