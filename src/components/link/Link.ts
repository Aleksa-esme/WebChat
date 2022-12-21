import Block from 'utils/block';

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
