import Component from 'utils/Component/Component';
import { validFocusField } from 'utils/Validation/ValidForm';

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
    });
  }

  render() {
    return `
      <form class='messages-send' id='form'>
          {{{ Button title='Файл' type='button' classes='link' }}} 
          {{{ MessageField onFocus=onFocus }}}
          {{{ Button title='Отправить' classes='link'}}} 
      </form>
    `;
  }
}

export default MessageField;
