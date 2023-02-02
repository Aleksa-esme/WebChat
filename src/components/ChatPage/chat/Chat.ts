import Component from 'utils/Component/Component';

interface IChatProps {
  id: string,
  name: String;
  date?: String;
  message?: String;
  messages?: String;
  avatar?: String;
  onClick?: () => void;
}

class Chat extends Component {
  static componentName = 'Chat';

  constructor({
    id, name, date, message, messages, avatar, onClick,
  }: IChatProps) {
    super({
      id,
      name,
      date,
      message,
      messages,
      avatar,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <div class='chat' id={{ id }}>
        {{{ Avatar size='47' url='${this.props.avatar}'}}}
        <div class='chat__text'>
          <div class='chat_line'>
            <p class='chat__title'>{{ name }}</p>
              {{#if ${this.props.message !== 'undefined'} }}
                <p class='chat__date'>{{ date }}</p>
              {{/if}}
          </div>
          <div class='chat_line'>
            {{#if ${this.props.message !== 'undefined'} }}
              <p class='chat__message'>{{ message }}</p>
              {{#if ${this.props.messages !== '0'} }}
                <div class='chat__indicator'><span>{{ messages }}</span></div>
              {{/if}}
            {{else}}
              <p class='chat__message'>Нет сообщений</p>
            {{/if}}
          </div>
        </div>
      </div>
    `;
  }
}

export default Chat;
