import Component from 'utils/Component/Component';
import { getUsers } from 'controllers/chatsController';

interface IChatInfoProps {
  avatar?: String;
}

class ChatInfo extends Component {
  static componentName = 'ChatInfo';

  constructor({ avatar }: IChatInfoProps) {
    super({ avatar });
  }

  render() {
    return `
      <div class='chat-info'>
        <div>
          <div class='chat-info__info'>
            {{{ Avatar size='34' url=avatar }}}
            <p class='chat-info__title'>${window.store.getState().chatTitle}</p>
          </div>
          <div class='chat-info__users'>${getUsers()}</div>
        </div>
        {{{ ChatMenu }}}
      </div>
    `;
  }
}

export default ChatInfo;
