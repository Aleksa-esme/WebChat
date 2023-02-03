import Component from 'utils/Component/Component';

interface IChatInfoProps {
  avatar?: String;
}

class ChatInfo extends Component {
  static componentName = 'ChatInfo';

  constructor({ avatar }: IChatInfoProps) {
    super({ avatar });
  }

  getUsers(): string {
    const users = window.store.getState().users;
    const string = users.reduce((result, user, index) => `${result}${user.login}${index < users.length - 1 ? ', ' : ''}`, '');
    return string;
  }

  getChatAvatar() {
    const chats = window.store.getState().chats;
    const chat = chats?.find(el => el.id === Number(window.store.getState().chatId));
    return chat?.avatar;
  }

  render() {
    return `
      <div class='chat-info'>
        <div>
          <div class='chat-info__info'>
            {{{ Avatar size='34' url=avatar }}}
            <p class='chat-info__title'>${window.store.getState().chatTitle}</p>
          </div>
          <div class='chat-info__users'>${this.getUsers()}</div>
        </div>
        {{{ ChatMenu }}}
      </div>
    `;
  }
}

export default ChatInfo;
