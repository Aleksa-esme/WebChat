import Block from 'utils/Component/block';

interface IMessageProps {
  content: String;
  classes: String;
}

class Message extends Block {
  static componentName = 'Message';

  constructor(props: IMessageProps) {
    super(props);
  }

  render() {
    return `
      <div class="message {{ classes }}">
          <span>{{ content }}</p>
      </div>
    `;
  }
}

export default Message;
