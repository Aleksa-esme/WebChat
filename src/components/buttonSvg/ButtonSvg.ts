import Component from 'utils/Component/Component';

interface IButtonSvgProps {
  alt: String;
  svg: SVGElement;
  title?: String;
  classes?: String;
  type?: String;
  onClick?: () => void;
}

class ButtonSvg extends Component {
  static componentName = 'ButtonSvg';

  constructor({
    alt, svg, title, classes, type, onClick,
  }: IButtonSvgProps) {
    super({
      alt,
      svg,
      title,
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
        {{#if ${!!this.props.title} }}
          <span class='link link-small svg-button__title'>{{ title }}</span>
        {{/if}}
      </button>
    `;
  }
}

export default ButtonSvg;
