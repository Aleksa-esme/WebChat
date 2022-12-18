import Block from '../../utils/Block';
import template from './Message.hbs';

interface IMessageProps {
  content: String;
  class: String;
}

class Message extends Block {
  constructor(props: IMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Message;
