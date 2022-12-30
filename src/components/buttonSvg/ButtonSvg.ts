import Block from 'utils/block';

interface IButtonSvgProps {
  alt: String;
  svg: SVGElement;
  onSubmit?: () => void;
}

class ButtonSvg extends Block {
  static componentName = 'ButtonSvg';

  constructor({ alt, svg, onSubmit }: IButtonSvgProps) {
    super({
      alt,
      svg,
      events: {
        click: onSubmit,
      },
    });
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
