import Component from 'utils/Component/Component';
import { validFocusField } from 'utils/Validation/ValidForm';
import { getUsers } from 'controllers/chatsController';

interface IFileFormProps {
  form_id: string,
  label: string,
  name: string,
  title: string,
  isInfo?: boolean,
  onSubmit?: () => void;
  onFocus?: () => void;
}

class ChatForm extends Component {
  static componentName = 'ChatForm';

  constructor({
    form_id, label, name, title, isInfo = false, onSubmit, onFocus,
  }: IFileFormProps) {
    super({
      form_id,
      label,
      name,
      title,
      isInfo,
      onFocus,
      events: {
        submit: onSubmit,
      },
    });

    this.setProps({
      onFocus: (event: Event) => validFocusField(event, form_id),
    });
  }

  render() {
    return `
      <form id={{ form_id }} class='avatar-form'>
        {{#if ${this.props.isInfo} }}
          <p>Пользователи в чате</p>
          <div class='chat-info__users'>${getUsers()}</div>
        {{/if}}
        {{{ Input 
          label=label
          name=name
          type='text'
          classLabel='login-form__label' 
          classInput='login-form__value' 
          onFocus=onFocus
        }}}
        {{{ Button 
          title=title
          classes='button profile-form__button-submit'
        }}}
      </form>
    `;
  }
}

export default ChatForm;
