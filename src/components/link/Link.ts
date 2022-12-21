import Block from '../../utils/Block';

interface ILinkProps {
  title: String;
  classes: String;
}

class Link extends Block {
  static componentName = 'Link';

  constructor(props: ILinkProps) {
    super(props);
  }

  render() {
    return `
      <a href="#" class="link {{ classes }}">{{ title }}</a>
    `;
  }
}

export default Link;
