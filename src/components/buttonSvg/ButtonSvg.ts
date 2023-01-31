import Component from 'utils/Component/Component';

interface IButtonSvgProps {
  alt: String;
  svg: SVGElement;
  classes?: String;
  type?: String;
  onClick?: () => void;
}

class ButtonSvg extends Component {
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
        <img src="{{ svg }}" alt={{ alt }}>
      </button>
    `;
  }
}

export default ButtonSvg;
