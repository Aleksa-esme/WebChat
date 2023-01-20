import Block from 'utils/Component/block';

interface IMessageProps {
  name?: String;
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
        {{#if ${!!this.props.name} }}
          <div class="message__name">
            <span>{{ name }}</span>
          </div>
        {{/if}}
          <div>
            <p>{{ content }}</p>
          </div>
      </div>
    `;
  }
}

export default Message;
