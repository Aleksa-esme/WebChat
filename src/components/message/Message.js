import Block from '../../utils/block';
import template from './Message.hbs';

class Message extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Message;
