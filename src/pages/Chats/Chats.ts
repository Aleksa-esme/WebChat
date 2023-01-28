import Block from 'utils/Component/block';
import withRouter from 'utils/HOCs/withRouter';
import withChats from 'utils/HOCs/withChats';
import withStore from 'utils/HOCs/withStore';
import { validateForm, validFocusField } from 'utils/ValidForm';
import { createChat, addUser, chooseChat } from 'services/chats';
import Messages from 'services/messages';
import formatDate from 'utils/helpers/formatDate';
import { Screens } from 'utils/Router/screenList';

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
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onCreateChat: () => this.onCreateChat(),
      onChooseChat: (event: Event) => this.onChooseChat(event),
      sendMessage: (event: SubmitEvent) => this.sendMessage(event),
    });
    console.log(window.store.getState().screen);
  }

  // componentDidUpdate() {
  //   // брать из HOC
  //   return window.store.getState().screen === Screens.ChatsPage;
  // }

  onCreateChat() {
    const chatData = prompt('Название чата');
    if (!!chatData) this.props.store.dispatch(createChat, { title: chatData });
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
    const isError = validateForm(event);
    if (!isError) {
      const outgoingMessage = document.querySelector('textarea[name="message"]');
      if (!!outgoingMessage) {
        Messages.sendMessage(outgoingMessage.value);
        outgoingMessage.value = '';
      }
    }
  }

  render() {
    console.log('%c Chats block render', 'background: #1f9af3; color: #fff');
    if (this.props.chats === 'undefined') {
      return '{{{ Loader }}}';
    }

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
          {{#if ${!!this.props.chats} }}
            ${this.props.chats?.map((el: Chat) => `
              {{{ Chat 
                id='${el.id}' 
                name='${el.title}' 
                date='${formatDate(el.last_message?.time)}' 
                message='${el.last_message?.content}' 
                messages='${el.unread_count}'
                onClick=onChooseChat
              }}}
            `).join(' ')}
          {{else}}  
              <div>У вас пока нет чатов</div>
          {{/if}}
          </div>
        </div>
        {{#if ${window.store.getState().chatId !== null} }}
          {{{ ChatField 
            name='${window.store.getState().chatTitle}'
            users='${this.getUsers()}'
            onSubmit=sendMessage
            onFocus=onFocus
          }}}
        {{else}}
          <div class='chat-field_empty'>
            <p>Выберите чат</p>
          </div>
        {{/if}}
        {{#if ${!!window.store.getState().isLoading} }}
          {{{ Loader }}}
        {{/if}}
      </section>
    `;
  }
}

export default withRouter(withStore(withChats(Chats)));
