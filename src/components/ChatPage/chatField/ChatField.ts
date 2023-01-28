import Block from 'utils/Component/block';
import { validateForm } from 'utils/ValidForm';
import Messages from 'services/messages';

interface IChatFieldProps {
  onScroll?: () => void;
}

class ChatField extends Block {
  static componentName = 'ChatField';

  constructor({ onScroll }: IChatFieldProps) {
    super({
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
      const outgoingMessage = document.querySelector('textarea[name="message"]');
      if (!!outgoingMessage) {
        Messages.sendMessage(outgoingMessage.value);
        outgoingMessage.value = '';
      }
    }
  }

  render() {
    return `
      <div class='chat-field'>
        {{{ ChatInfo name=name users=users }}}
        {{{ MessagesList }}}
        {{{ MessageForm onSubmit=sendMessage }}}
      </div>
    `;
  }
}

export default ChatField;
