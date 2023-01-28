import Block from 'utils/Component/block';

interface IButtonSvgProps {
  alt: String;
  svg: SVGElement;
  classes?: String;
  type?: String;
  onClick?: () => void;
}

class ButtonSvg extends Block {
  static componentName = 'ButtonSvg';

  constructor({
    alt, svg, classes, type, onClick,
  }: IButtonSvgProps) {
    super({
      alt,
      svg,
      classes,
      type,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <button class='{{ classes }}' type={{ type }}>
        <img src={{ svg }} alt={{ alt }}>
      </button>
    `;
  }
}

export default ButtonSvg;
