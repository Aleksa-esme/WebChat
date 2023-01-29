import Block from 'utils/Component/Block';

interface IMessageProps {
  name?: String;
  content: String;
  date?: String;
  classes: String;
}

class Message extends Block {
  static componentName = 'Message';

  constructor(props: IMessageProps) {
    super(props);
  }

  render() {
    // console.log('%c Message render', 'background: #5f5af3; color: #fff');
    return `
      <div class='message {{ classes }}'>
        {{#if ${!!this.props.name} }}
          <div class='message__name'>
            <span>{{ name }}</span>
          </div>
        {{/if}}
          <div>
            <p class='message__content-text'>{{ content }}</p>
            <p class='message__content-date'>{{ date }}</p>
          </div>
      </div>
    `;
  }
}

export default Message;