import Component from 'utils/Component/Component';

interface IFileFormProps {
  form_id: String,
  name: String;
  isMultiple: Boolean;
  onSubmit?: () => void;
}

class FileForm extends Component {
  static componentName = 'FileForm';

  constructor({
    form_id, name, isMultiple = false, onSubmit,
  }: IFileFormProps) {
    super({
      form_id,
      name,
      isMultiple,
      events: {
        submit: onSubmit,
      },
    });
  }

  render() {
    return `
      <form id={{ form_id }} class='avatar-form'>
        {{#if ${this.props.isMultiple} }}
          <input type='file' name='{{ name }}' accept='image/*' class='avatar-form__input' multiple>
        {{else}}
          <input type='file' name='{{ name }}' accept='image/*' class='avatar-form__input'>
        {{/if}}
        <p class='avatar-form__size'>Размер файла не должен превышать 1МБ</p>
        {{{ Button 
          title='Отправить изображение' 
          classes='link' 
        }}}
      </form>
    `;
  }
}

export default FileForm;
