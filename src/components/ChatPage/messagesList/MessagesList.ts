import Block from 'utils/Component/block';
import formatDate from 'utils/helpers/formatDate';

class MessagesList extends Block {
  static componentName = 'MessagesList';

  static chatUsers: Array<User>;

  static messagesArray: Array<Message> | Array<NewMessage> = [];

  constructor(props: any) {
    super(props);

    MessagesList.chatUsers = window.store.getState().users;
  }

  getMessageUser(id: number): string {
    console.log(id);
    let messageUser;
    if (!!MessagesList.chatUsers) messageUser = MessagesList.chatUsers.find(user => user.id === id).login;
    else messageUser = '';

    return messageUser;
  }

  render() {
    return `
      <div class='messages-list'>
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
    `;
  }
}

export default MessagesList;
