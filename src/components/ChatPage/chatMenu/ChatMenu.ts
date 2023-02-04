import Component from 'utils/Component/Component';
import * as MenuSvg from 'assets/svg/chat-menu.svg';
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
              {{{ Button 
                title='Добавить пользователя' 
                classes='link link-small'
                onClick=onAddUser
              }}}
            </li>
            <li>
              {{{ Button 
                title='Удалить пользователя' 
                classes='link link-small'
                onClick=onDeleteUser
              }}}
            </li>
            <li>
              {{{ Button 
                title='Изменить аватар чата' 
                classes='link link-small'
                onClick=onShowModal
              }}}
            </li>
            <li>
              {{{ Button 
                title='Удалить чат' 
                classes='link link-small'
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
