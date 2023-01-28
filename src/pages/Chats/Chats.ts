import Block from 'utils/Component/Block';
import withRouter from 'utils/HOCs/withRouter';
import withChats from 'utils/HOCs/withChats';
import withStore from 'utils/HOCs/withStore';
import { createChat } from 'services/chats';

class Chats extends Block {
  static componentName = 'Chats';

  constructor(props: any) {
    super(props);

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onCreateChat: () => this.onCreateChat(),
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
              onClick=navigateProfile
            }}}
          </div>
          <input type='text' class='chats__search' placeholder='Поиск'>
          {{{ ChatList }}}
        </div>
        {{#if ${window.store.getState().chatId !== null} }}
          {{{ ChatField }}}
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
