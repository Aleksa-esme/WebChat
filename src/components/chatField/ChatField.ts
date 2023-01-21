import Block from 'utils/Component/block';
import * as MenuSvg from 'assets/svg/chat-menu.svg';
import withStore from 'utils/HOCs/withStore';
import formatDate from 'utils/helpers/formatDate';

interface IChatFieldProps {
  name?: string;
  users?: string;
  onSubmit?: () => void;
  onScroll?: () => void;
}

class ChatField extends Block {
  static componentName = 'ChatField';

  constructor({
    name, users, onSubmit, onScroll,
  }: IChatFieldProps) {
    super({
      name,
      users,
      onSubmit,
      events: {
        scroll: onScroll,
      },
    });

    this.setProps({
      showMenu: () => this.showMenu(),
    });
  }

  getMessageUser(id: string): string {
    const users = window.store.getState().users;
    return users.find(user => user.id == id).login;
  }

  showMenu() {
    const menu = document.querySelector('.chat-field__menu__buttons');
    menu!.classList.toggle('show');

    // возможно дописать закрытие при клике за пределами блока
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
                  }}}
                </li>
                <li>
                  {{{ Button 
                    title='Удалить пользователя' 
                    classes='link link-small' 
                  }}}
                </li>
                <li>
                  {{{ Button 
                    title='Удалить чат' 
                    classes='link link-small' 
                  }}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class='chat-field__field' id='messages' id='scroller'>
        ${window.store.getState().messages.map(el => `
          {{#if ${window.store.getState().user?.id === el.user_id} }}
            {{{ Message 
              classes='message-text message_user message-text_user' 
              content='${el.content}'
              date='${formatDate(el.time)}'
            }}}
          {{else}}
            {{{ Message 
              classes='message-text' 
              content='${el.content}' 
              date='${formatDate(el.time)}'
              name='${this.getMessageUser(el.user_id)}'
            }}}
          {{/if}}
        `).join(' ')}
        </div>
        {{{ MessageForm onSubmit=onSubmit }}}
      </div>
    `;
  }
}

export default withStore(ChatField);

// <p class="messages-field__date">19 июня</p>
