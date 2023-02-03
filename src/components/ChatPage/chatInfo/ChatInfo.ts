import Component from 'utils/Component/Component';

class ChatInfo extends Component {
  static componentName = 'ChatInfo';

  getUsers(): string {
    const users = window.store.getState().users;
    const string = users.reduce((result, user, index) => `${result}${user.login}${index < users.length - 1 ? ', ' : ''}`, '');
    return string;
  }

  render() {
    return `
      <div class='chat-info'>
        <div>
          <div class='chat-info__info'>
            {{{ Avatar size='34' }}}
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
