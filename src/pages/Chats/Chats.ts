import Block from 'utils/Component/block';
import withRouter from 'utils/HOCs/withRouter';
import withChats from 'utils/HOCs/withChats';
import withStore from 'utils/HOCs/withStore';
import * as ArrowSvg from 'assets/svg/arrow.svg';
import { validateForm, validFocusField } from 'utils/ValidForm';
import { createChat, addUser, chooseChat } from 'services/chats';
import Messages from 'services/messages';
import formatDate from 'utils/helpers/formatDate';

interface IChatsProps {
  onSubmit?: () => void;
  onFocus?: () => void;
  onNavigate?: () => void;
}

class Chats extends Block {
  static componentName = 'Chats';

  constructor(props: IChatsProps) {
    super({
      ...props,
      onSubmit: (event: Event) => validateForm(event),
      onFocus: (event: Event) => validFocusField(event),
      // chats: window.store.getState().chats,
    });

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onCreateChat: () => this.onCreateChat(),
      onChooseChat: (event: Event) => this.onChooseChat(event),
      sendMessage: (event: SubmitEvent) => this.sendMessage(event),
      // scrollPosition: () => this.scrollPosition(),
      // chats: window.store.getState().chats,
    });
  }

  onCreateChat() {
    const chatData = prompt('Название чата');
    this.props.store.dispatch(createChat, { title: chatData });
  }

  onAddUser(event: Event) {
    // взять id чата откуда то
    // const chatId = event.currentTarget.id;
    // console.log(chatId);
    const chatData = prompt('ID пользователя');
    this.props.store.dispatch(addUser, { users: [chatData], chatId });
  }

  onChooseChat(event: Event) {
    const chatId = event.currentTarget!.id;
    this.props.store.dispatch(chooseChat, chatId);
  }

  getUsers(): string {
    const users = window.store.getState().users;
    const string = users.reduce((result, user, index) => `${result}${user.login}${index < users.length - 1 ? ', ' : ''}`, '');
    return string;
  }

  sendMessage(event: SubmitEvent): void {
    event.preventDefault();

    const outgoingMessage = document.querySelector('textarea[name="message"]');
    Messages.sendMessage(outgoingMessage.value);
    outgoingMessage.value = '';
  }

  // scrollPosition() {
  //   const scroller = document.querySelector("#scroller");
  //   console.log(scroller.scrollTop);
  // }

  render() {
    return `
      <section class='chat-page'>
        <div class='chats'>
          <div class='chats__buttons'>
            {{{ Button 
              title='Создать чат' 
              classes='link link-small chats__link' 
              onClick=onCreateChat
            }}}
            {{{ Button 
              title='Профиль >' 
              classes='link link-small chats__link' 
              onNavigate=navigateProfile
            }}}
          </div>
          <input type='text' class='chats__search' placeholder='Поиск'>
          <div>
          ${this.props.chats?.map(el => `
            {{{ Chat 
              id='${el.id}' 
              name='${el.title}' 
              date='${formatDate(el.last_message?.time)}' 
              message='${el.last_message?.content}' 
              messages='${el.unread_count}'
              onClick=onChooseChat
            }}}
          `).join(' ')}
          </div>
        </div>
        {{#if ${window.store.getState().chatId !== null} }}
          {{{ ChatField 
            name='${window.store.getState().chatTitle}'
            users='${this.getUsers()}'
            onSubmit=sendMessage
          }}}
        {{else}}
          <div>Выберите чат</div>
        {{/if}}
      </section>
    `;
  }
}

export default withRouter(withStore(withChats(Chats)));

// <a href="#" class="link link-small chats__link">
//     Профиль
//     <img src=${ArrowSvg} alt="arrow">
// </a>

// ${messages.map(el => `
//                     {{{ Message classes="${el.class}" content="${el.content}"}}}
//                   `).join(' ')}
