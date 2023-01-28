import Block from 'utils/Component/block';
import * as MenuSvg from 'assets/svg/chat-menu.svg';
import withStore from 'utils/HOCs/withStore';
import formatDate from 'utils/helpers/formatDate';
import { addUser, deleteChat, deleteUser } from 'services/chats';

interface IChatFieldProps {
  name: string;
  users: string;
  onSubmit?: () => void;
  onFocus?: () => void;
  onScroll?: () => void;
}

class ChatField extends Block {
  static componentName = 'ChatField';

  static chatUsers: Array<User>;

  constructor({
    name, users, onSubmit, onScroll, onFocus,
  }: IChatFieldProps) {
    super({
      name,
      users,
      onSubmit,
      onFocus,
      events: {
        scroll: onScroll,
      },
    });
    ChatField.chatUsers = window.store.getState().users;

    this.setProps({
      showMenu: () => this.showMenu(),
      onAddUser: () => this.onAddUser(),
      onDeleteUser: () => this.onDeleteUser(),
      onDeleteChat: () => this.onDeleteChat(),
    });
  }

  getNewMessages() {
    return window.store.getState().newMessages;
  }

  showMenu() {
    const menu = document.querySelector('.chat-field__menu__buttons');
    menu!.classList.toggle('show');
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

  getMessageUser(id: number): string {
    let messageUser;
    if (!!ChatField.chatUsers) messageUser = ChatField.chatUsers.find(user => user.id === id).login;
    else messageUser = '';

    return messageUser;
  }

  render() {
    return `
      <div class='chat-field'>
        <div class='chat-field__info'>
          <div>
            <div class='chat-field__info__user'>
              <div class='chat-field__info__user-image'>
                <img src='https://dummyimage.com/34x34/999999' alt='user'>
              </div>
              <p class='chat-field__info__user-name'>{{ name }}</p>
            </div>
            <div class='chat-field__info__users'>{{ users }}</div>
          </div>
          <div class='chat-field__menu'>
            {{{ ButtonSvg 
              svg='${MenuSvg}' 
              alt='menu' 
              type='button' 
              classes='svg-button'
              onClick=showMenu 
            }}}
            <div class='chat-field__menu__buttons'>
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
                    title='Удалить чат' 
                    classes='link link-small'
                    onClick=onDeleteChat
                  }}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {{{ MessagesList }}}
        {{{ MessageForm onSubmit=onSubmit onFocus=onFocus }}}
      </div>
    `;
  }
}

export default ChatField;
