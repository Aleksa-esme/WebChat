import Component from 'utils/Component/Component';
import { onSendMessage } from 'controllers/chatsController';

interface IChatFieldProps {
  onScroll?: () => void;
  avatar?: String;
}

class ChatField extends Component {
  static componentName = 'ChatField';

  constructor({ avatar, onScroll }: IChatFieldProps) {
    super({
      avatar,
      events: {
        scroll: onScroll,
      },
    });

    this.setProps({
      sendMessage: (event: SubmitEvent) => onSendMessage(event),
    });
  }

  render() {
    return `
      <div class='chat-field'>
        {{{ ChatInfo name=name users=users avatar=avatar }}}
        {{{ MessagesList }}}
        {{{ MessageForm onSubmit=sendMessage }}}
      </div>
    `;
  }
}

export default ChatField;
