import Block from 'utils/Component/Block';
import formatDate from 'utils/helpers/formatDate';
import { chooseChat } from 'services/chats';

class ChatList extends Block {
  static componentName = 'ChatList';

  constructor(props: any) {
    super(props);

    this.setProps({
      onChooseChat: (event: Event) => this.onChooseChat(event),
    });
  }

  onChooseChat(event: Event) {
    const chatId = event.currentTarget!.id;
    window.store.dispatch(chooseChat, chatId);
  }

  render() {
    return `
      <div>
        {{#if ${!!window.store.getState().chats} }}
          ${window.store.getState().chats?.map((el: Chat) => `
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
    `;
  }
}

export default ChatList;