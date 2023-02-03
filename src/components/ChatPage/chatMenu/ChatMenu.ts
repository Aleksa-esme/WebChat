import Component from 'utils/Component/Component';
import * as MenuSvg from 'assets/svg/chat-menu.svg';
import { addUser, deleteChat, deleteUser } from 'services/chats';
import showBlock from 'utils/helpers/showBlock';

class ChatMenu extends Component {
  static componentName = 'ChatMenu';

  constructor(props: unknown) {
    super(props);

    this.setProps({
      showMenu: () => showBlock('.chat-menu__buttons'),
      onAddUser: () => this.onAddUser(),
      onDeleteUser: () => this.onDeleteUser(),
      onDeleteChat: () => this.onDeleteChat(),
      onShowModal: () => showBlock('#modal-avatar'),
    });
  }

  onAddUser() {
    const chatId = window.store.getState().chatId;
    const login = prompt('Введите логин пользователя');
    if (!!login) window.store.dispatch(addUser, { user: login, chatId });
  }

  onDeleteUser() {
    const chatId = window.store.getState().chatId;
    const login = prompt('Введите логин пользователя, которого хотите удалить');
    if (!!login) window.store.dispatch(deleteUser, { user: login, chatId });
  }

  onDeleteChat() {
    const chatId = window.store.getState().chatId;
    window.store.dispatch(deleteChat, chatId);
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
