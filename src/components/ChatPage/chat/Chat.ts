import Block from 'utils/Component/Block';

interface IChatProps {
  id: string,
  name: String;
  date?: String;
  message?: String;
  messages?: String;
  onClick?: () => void;
}

class Chat extends Block {
  static componentName = 'Chat';

  constructor({
    id, name, date, message, messages, onClick,
  }: IChatProps) {
    super({
      id,
      name,
      date,
      message,
      messages,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <div class='chat' id={{ id }}>
        {{{ Avatar size='47' }}}
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
