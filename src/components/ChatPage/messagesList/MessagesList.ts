import Component from 'utils/Component/Component';
import formatDate from 'utils/helpers/formatDate';
import { getMessageUser, checkFile } from 'controllers/chatsController';

class MessagesList extends Component {
  static componentName = 'MessagesList';

  constructor(props: unknown) {
    super(props);
  }

  render() {
    return `
      <div class='messages-list scroll'>
        ${window.store.getState().messages.map(el => `
          {{#if ${window.store.getState().user?.id === el.user_id} }}
            {{{ Message 
              classes='message-text message_user message-text_user' 
              content='${el.content}'
              date='${formatDate(el.time)}'
              type='${el.type}'
              path='${checkFile(el)}'
            }}}
          {{else}}
            {{{ Message 
              classes='message-text' 
              content='${el.content}' 
              date='${formatDate(el.time)}'
              name='${getMessageUser(el.user_id)}'
              type='${el.type}'
              path='${checkFile(el)}'
            }}}
          {{/if}}
        `).join(' ')}
      </div>
    `;
  }
}

export default MessagesList;
