import Block from '../../utils/Block';

interface IButtonSvgProps {
  alt: String;
  svg: SVGElement;
}

class ButtonSvg extends Block {
  static componentName = 'ButtonSvg';

  constructor(props: IButtonSvgProps) {
    super(props);
  }

  render() {
    return `
      <button class="svg-button" type="submit">
          <img src={{svg}} alt={{alt}}>
      </button>
    `;
  }
}

export default ButtonSvg;
