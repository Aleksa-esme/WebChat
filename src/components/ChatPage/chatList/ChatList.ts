import Component from 'utils/Component/Component';
import formatDate from 'utils/helpers/formatDate';
import { onChooseChat } from 'controllers/chatsController';

class ChatList extends Component {
  static componentName = 'ChatList';

  constructor(props: unknown) {
    super(props);

    this.setProps({
      onChooseChat: (event: Event) => onChooseChat(event),
    });
  }

  render() {
    return `
      <div class='chat-list scroll'>
        {{#if ${!!window.store.getState().chats} }}
          ${window.store.getState().chats?.map((el: Chat) => `
            {{{ Chat 
              id='${el.id}' 
              name='${el.title}' 
              date='${formatDate(el.last_message?.time)}' 
              message='${el.last_message?.content}' 
              messages='${el.unread_count}'
              avatar='${el.avatar}'
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
