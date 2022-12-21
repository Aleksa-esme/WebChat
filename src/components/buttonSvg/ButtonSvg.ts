import Block from 'utils/block';

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
      <button class="svg-button" type={{type}}>
          <img src={{svg}} alt={{alt}}>
      </button>
    `;
  }
}

export default ButtonSvg;
