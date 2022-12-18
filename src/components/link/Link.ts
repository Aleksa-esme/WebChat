import Block from '../../utils/Block';
import template from './template';

interface ILinkProps {
  title: String;
  class: String;
}

class Link extends Block {
  constructor(props: ILinkProps) {
    super(props);
  }

  render() {
    // return this.compile(template, { ...this.props });
    return template;
  }
}

export default Link;
