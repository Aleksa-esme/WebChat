import Block from '../../utils/Block';
import template from './template';

interface IChatProps {
  name: String;
  date: String;
  message: String;
  messages: String;
}

class Chat extends Block {
  static componentName = 'Chat';

  constructor(props: IChatProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Chat;
