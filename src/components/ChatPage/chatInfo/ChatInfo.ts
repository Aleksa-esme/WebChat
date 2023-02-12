import Component from 'utils/Component/Component';
import { getUsers, showChats } from 'controllers/chatsController';
import * as ArrowButton from 'assets/svg/arrow_button.svg';

interface IChatInfoProps {
  avatar?: String;
}

class ChatInfo extends Component {
  static componentName = 'ChatInfo';

  constructor({ avatar }: IChatInfoProps) {
    super({ avatar });

    this.setProps({
      showChats: () => showChats(),
    });
  }

  render() {
    return `
      <div class='chat-info'>
        <div class='chat-info__left'>
          {{{ ButtonSvg 
            svg='${ArrowButton}' 
            alt='back' 
            type='button' 
            classes='svg-button' 
            onClick=showChats
          }}}
          <div>
            <div class='chat-info__info'>
              {{{ Avatar size='34' url=avatar }}}
              <p class='chat-info__title'>${window.store.getState().chatTitle}</p>
            </div>
            <div class='chat-info__users'>${getUsers()}</div>
          </div>
        </div>
        {{{ ChatMenu }}}
      </div>
    `;
  }
}

export default ChatInfo;
