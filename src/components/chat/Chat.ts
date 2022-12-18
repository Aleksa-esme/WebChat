import Block from '../../utils/Block';
import template from './Chat.hbs';

interface IChatProps {
  name: String;
  date: String;
  message: String;
  messages: String;
}

class Chat extends Block {
  constructor(props: IChatProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Chat;
