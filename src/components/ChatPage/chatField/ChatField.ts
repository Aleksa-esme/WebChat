import Block from 'utils/Component/block';

interface IChatFieldProps {
  name: string;
  users: string;
  onSubmit?: () => void;
  onFocus?: () => void;
  onScroll?: () => void;
}

class ChatField extends Block {
  static componentName = 'ChatField';

  constructor({
    name, users, onSubmit, onScroll, onFocus,
  }: IChatFieldProps) {
    super({
      name,
      users,
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
        <div class='chat-field__info'>
          <div>
            <div class='chat-field__info__user'>
              <div class='chat-field__info__user-image'>
                <img src='https://dummyimage.com/34x34/999999' alt='user'>
              </div>
              <p class='chat-field__info__user-name'>{{ name }}</p>
            </div>
            <div class='chat-field__info__users'>{{ users }}</div>
          </div>
          {{{ ChatMenu }}}
        </div>
        {{{ MessagesList }}}
        {{{ MessageForm onSubmit=onSubmit onFocus=onFocus }}}
      </div>
    `;
  }
}

export default ChatField;
