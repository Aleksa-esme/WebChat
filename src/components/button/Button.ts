import Block from '../../utils/Block';
import template from './Button.hbs';

interface IButtonProps {
  title: String;
  class: String;
  // events?: {
  //   click?: () => void
  // }
}

class Button extends Block {
  constructor(props: IButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Button;
