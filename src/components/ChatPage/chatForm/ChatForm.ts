import Component from 'utils/Component/Component';

interface IFileFormProps {
  form_id: String,
  onSubmit?: () => void;
}

class ChatForm extends Component {
  static componentName = 'ChatForm';

  constructor({
    form_id, onSubmit,
  }: IFileFormProps) {
    super({
      form_id,
      events: {
        submit: onSubmit,
      },
    });
  }

  render() {
    return `
      <form id={{ form_id }} class='avatar-form'>
        {{{ Input 
          label='Введите название чата' 
          name='chat-title' 
          type='text'
          classLabel='login-form__label' 
          classInput='login-form__value' 
        }}}
        {{{ Button 
          title='Создать чат' 
          classes='button profile-form__button-submit'
        }}}
      </form>
    `;
  }
}

export default ChatForm;
