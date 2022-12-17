import Block from '../../utils/block';
import template from './input.hbs';

class Input extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Input;
