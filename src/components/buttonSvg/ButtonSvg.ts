import Block from '../../utils/Block';
import template from './template';

interface IButtonSvgProps {
  alt: String;
  svg: SVGElement;
}

class ButtonSvg extends Block {
  constructor(props: IButtonSvgProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default ButtonSvg;
