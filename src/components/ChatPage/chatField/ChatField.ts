import Component from 'utils/Component/Component';
import { validateForm } from 'utils/Validation/ValidForm';
import Messages from 'services/messages';

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
      sendMessage: (event: SubmitEvent) => this.sendMessage(event),
    });
  }

  sendMessage(event: SubmitEvent): void {
    event.preventDefault();
    const isError = validateForm(event);
    if (!isError) {
      const outgoingMessage = document.querySelector('textarea[name="message"]') as HTMLInputElement;
      if (!!outgoingMessage) {
        Messages.sendMessage(outgoingMessage.value);
        outgoingMessage.value = '';
      }
    }
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
