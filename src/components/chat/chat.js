import Block from '../../utils/block';
import template from './chat.hbs';

class Chat extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Chat;
