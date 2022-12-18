import Block from '../../utils/block';
import template from './button.hbs';

// interface IButtonProps {
//   title: String;
//   events?: {
//     click?: () => void
//   }
// }

class Button extends Block {
  // props: IButtonProps
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Button;
