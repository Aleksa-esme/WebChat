import Component from 'utils/Component/Component';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import * as FileSvg from 'assets/svg/file.svg';
import { validFocusField } from 'utils/Validation/ValidForm';
import showBlock from 'utils/helpers/showBlock';

interface IMessageFieldProps {
  onSubmit?: () => void;
}

class MessageField extends Component {
  static componentName = 'MessageForm';

  constructor({ onSubmit }: IMessageFieldProps) {
    super({
      events: {
        submit: onSubmit,
      },
    });

    this.setProps({
      onFocus: (event: Event) => validFocusField(event),
      onShowModal: () => showBlock('#modal-file'),
    });
  }

  render() {
    return `
      <form class='messages-send' id='form'>
          {{{ ButtonSvg svg='${FileSvg}' alt='add file' type='button' classes='svg-button' onClick=onShowModal }}} 
          {{{ MessageField onFocus=onFocus }}}
          {{{ ButtonSvg svg='${ArrowButton}' alt='send' type='submit' classes='svg-button' }}} 
      </form>
    `;
  }
}

export default MessageField;
