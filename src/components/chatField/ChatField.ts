import Block from 'utils/Component/block';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import * as FileSvg from 'assets/svg/file.svg';
import * as MenuSvg from 'assets/svg/chat-menu.svg';

interface IChatFieldProps {
  name?: string;
  users?: string;
}

class ChatField extends Block {
  static componentName = 'ChatField';

  constructor({ name, users }: IChatFieldProps) {
    super({ name, users });
  }

  render() {
    return `
    <div class="messages">
      <div class="messages-info">
        <div>
          <div class="messages-info__user">
            <div class="messages-info__user-image">
              <img src="https://dummyimage.com/34x34/999999" alt="user">
            </div>
            <p class="messages-info__user-name">{{name}}</p>
          </div>
          <div class="messages-info__users">{{users}}</div>
        </div>
        <img src=${MenuSvg} alt="menu">
      </div>
      <div class="messages-field">
        <p class="messages-field__date">19 июня</p>
      </div>
      <form class="messages-send" id="form">
        {{{ ButtonSvg svg="${FileSvg}" alt='add file' type='button' classes="svg-button" }}} 
        {{{ MessageField onFocus=onFocus }}}
        {{{ ButtonSvg svg="${ArrowButton}" alt='send' type='submit' classes="svg-button" onSubmit=onSubmit}}} 
      </form>
    </div>
    `;
  }
}

export default ChatField;
