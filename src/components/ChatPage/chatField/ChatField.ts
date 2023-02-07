import Component from 'utils/Component/Component';
import { onSendMessage, scrollToBottom } from 'controllers/chatsController';

interface IChatFieldProps {
  avatar?: String;
}

class ChatField extends Component {
  static componentName = 'ChatField';

  constructor({ avatar }: IChatFieldProps) {
    super({ avatar });

    this.setProps({
      sendMessage: (event: SubmitEvent) => onSendMessage(event),
    });
  }

  componentDidUpdate = () => {
    setTimeout(() => scrollToBottom(), 100);
    return true;
  };

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
