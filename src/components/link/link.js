import Block from '../../utils/block';
import template from './link.hbs';

class Link extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Link;
