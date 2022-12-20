import Block from '../../utils/Block';
import template from './template';

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
    return template;
  }
}

export default Link;
