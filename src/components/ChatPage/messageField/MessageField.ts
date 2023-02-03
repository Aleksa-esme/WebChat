import Component from 'utils/Component/Component';

interface IMessageFieldProps {
  onFocus?: () => void;
}

class MessageField extends Component {
  static componentName = 'MessageField';

  constructor({ onFocus }: IMessageFieldProps) {
    super({
      events: {
        focusin: onFocus,
      },
    });
  }

  render() {
    return `
      <div class='messages-field'>
        <textarea 
          name='message' 
          type='text' 
          class='messages-field__input' 
          placeholder='Сообщение' 
          rows='2' 
          wrap='soft'
        >
        </textarea>
        <span class='error'></span>
      </div>
    `;
  }
}

export default MessageField;
