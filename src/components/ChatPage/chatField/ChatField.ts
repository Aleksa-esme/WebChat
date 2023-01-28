import Block from 'utils/Component/block';

interface IChatFieldProps {
  onSubmit?: () => void;
  onFocus?: () => void;
  onScroll?: () => void;
}

class ChatField extends Block {
  static componentName = 'ChatField';

  constructor({
    onSubmit, onScroll, onFocus,
  }: IChatFieldProps) {
    super({
      onSubmit,
      onFocus,
      events: {
        scroll: onScroll,
      },
    });
  }

  render() {
    return `
      <div class='chat-field'>
        {{{ ChatInfo name=name users=users }}}
        {{{ MessagesList }}}
        {{{ MessageForm onSubmit=onSubmit onFocus=onFocus }}}
      </div>
    `;
  }
}

export default ChatField;
