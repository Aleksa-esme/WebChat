import Block from 'utils/Component/block';

class ChatInfo extends Block {
  static componentName = 'ChatInfo';

  constructor(props: any) {
    super(props);
  }

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
            <div class='chat-info__image'>
              <img src='https://dummyimage.com/34x34/999999' alt='chat'>
            </div>
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
