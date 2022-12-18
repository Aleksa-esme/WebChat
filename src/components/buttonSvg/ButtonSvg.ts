import Block from '../../utils/Block';
import template from './ButtonSvg.hbs';

interface IButtonSvgProps {
  alt: String;
  svg: SVGElement;
}

class ButtonSvg extends Block {
  constructor(props: IButtonSvgProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ButtonSvg;
