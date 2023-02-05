import Component from 'utils/Component/Component';
import * as MenuSvg from 'assets/svg/chat-menu.svg';
import * as UserAddSvg from 'assets/svg/user-add.svg';
import * as UserDeleterSvg from 'assets/svg/user-delete.svg';
import * as AvatarSvg from 'assets/svg/avatar.svg';
import * as ChatDeleteSvg from 'assets/svg/chats-delete.svg';
import showBlock from 'utils/helpers/showBlock';

import { onAddUser, onDeleteUser, onDeleteChat } from 'controllers/chatsController';

class ChatMenu extends Component {
  static componentName = 'ChatMenu';

  constructor(props: unknown) {
    super(props);

    this.setProps({
      showMenu: () => showBlock('.chat-menu__buttons'),
      onShowModal: () => showBlock('#modal-avatar'),
      onAddUser: () => onAddUser(),
      onDeleteUser: () => onDeleteUser(),
      onDeleteChat: () => onDeleteChat(),
    });
  }

  render() {
    return `
      <div class='chat-menu'>
        {{{ ButtonSvg
          svg='${MenuSvg}' 
          alt='menu'
          type='button' 
          classes='svg-button'
          onClick=showMenu 
        }}}
        <div class='chat-menu__buttons'>
          <ul>
            <li>
              {{{ ButtonSvg 
                svg='${UserAddSvg}' 
                alt='add user'
                title='Добавить пользователя' 
                classes='svg-button'
                onClick=onAddUser
              }}}
            </li>
            <li>
              {{{ ButtonSvg 
                svg='${UserDeleterSvg}' 
                alt='delete user'
                title='Удалить пользователя' 
                classes='svg-button'
                onClick=onDeleteUser
              }}}
            </li>
            <li>
              {{{ ButtonSvg 
                svg='${AvatarSvg}' 
                alt='change avatar'
                title='Изменить аватар чата' 
                classes='svg-button'
                onClick=onShowModal
              }}}
            </li>
            <li>
              {{{ ButtonSvg 
                svg='${ChatDeleteSvg}' 
                alt='delete chat'
                title='Удалить чат' 
                classes='svg-button'
                onClick=onDeleteChat
              }}}
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}

export default ChatMenu;
