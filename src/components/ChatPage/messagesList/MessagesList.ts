import Component from 'utils/Component/Component';
import formatDate from 'utils/helpers/formatDate';

class MessagesList extends Component {
  static componentName = 'MessagesList';

  static chatUsers: Array<User>;

  static messagesArray: Array<Message> | Array<NewMessage> = [];

  constructor(props: unknown) {
    super(props);

    MessagesList.chatUsers = window.store.getState().users;
  }

  getMessageUser(id: number): string {
    let messageUser;
    if (!!MessagesList.chatUsers && typeof id !== 'undefined') messageUser = MessagesList.chatUsers!.find(user => user.id === id)!.login;
    else messageUser = '';

    return messageUser;
  }

  checkFile(el: any) {
    let path;
    if (el.type === 'file') path = `https://ya-praktikum.tech/api/v2/resources${el.file.path}`;
    else path = '';
    return path;
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
              type='${el.type}'
              path='${this.checkFile(el)}'
            }}}
          {{else}}
            {{{ Message 
              classes='message-text' 
              content='${el.content}' 
              date='${formatDate(el.time)}'
              name='${this.getMessageUser(el.user_id)}'
              type='${el.type}'
              path='${this.checkFile(el)}'
            }}}
          {{/if}}
        `).join(' ')}
      </div>
    `;
  }
}

export default MessagesList;
