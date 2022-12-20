import Block from '../../utils/Block';
import template from './template';

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
    return template;
  }
}

export default Button;
