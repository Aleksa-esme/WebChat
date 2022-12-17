import Block from '../../utils/block';
import template from './button-svg.hbs';

class ButtonSvg extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ButtonSvg;
