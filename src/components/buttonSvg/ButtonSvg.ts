import Block from 'utils/Component/block';

interface IButtonSvgProps {
  alt: String;
  svg: SVGElement;
  classes?: String;
  onSubmit?: () => void;
  onNavigate?: () => void;
}

class ButtonSvg extends Block {
  static componentName = 'ButtonSvg';

  constructor({
    alt, svg, classes, onSubmit, onNavigate,
  }: IButtonSvgProps) {
    super({
      alt,
      svg,
      classes,
      events: {
        click: [onSubmit, onNavigate],
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
