import Component from 'utils/Component/Component';

interface IFileFormProps {
  form_id: String,
  onSubmit?: () => void;
}

class FileForm extends Component {
  static componentName = 'FileForm';

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
        <input type='file' name='file' accept='image/*' class='avatar-form__input'>
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
