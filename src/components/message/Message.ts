import Block from '../../utils/Block';
import template from './template';

interface IMessageProps {
  content: String;
  class: String;
}

class Message extends Block {
  constructor(props: IMessageProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Message;
