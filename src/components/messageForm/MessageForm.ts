import Block from 'utils/Component/block';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import * as FileSvg from 'assets/svg/file.svg';

interface IMessageFieldProps {
  onSubmit?: () => void;
  onFocus?: () => void;
}

class MessageField extends Block {
  static componentName = 'MessageForm';

  constructor({ onSubmit, onFocus }: IMessageFieldProps) {
    super({
      onFocus,
      events: {
        submit: onSubmit,
      },
    });
  }

  render() {
    return `
      <form class='messages-send' id='form'>
          {{{ ButtonSvg svg='${FileSvg}' alt='add file' type='button' classes='svg-button' }}} 
          {{{ MessageField onFocus=onFocus }}}
          {{{ ButtonSvg svg='${ArrowButton}' alt='send' type='submit' classes='svg-button'}}} 
      </form>
    `;
  }
}

export default MessageField;
