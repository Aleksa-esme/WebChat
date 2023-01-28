import Block from 'utils/Component/block';

interface IAvatarFormProps {
  form_id: String,
  size: String,
  url?: String,
  onSubmit?: () => void;
}

class AvatarForm extends Block {
  static componentName = 'AvatarForm';

  constructor({
    form_id, size, url, onSubmit,
  }: IAvatarFormProps) {
    super({
      form_id,
      size,
      url,
      events: {
        submit: onSubmit,
      },
    });
  }

  render() {
    return `
      <form id={{ form_id }} class='avatar-form'>
        {{{ Avatar size=size url=url }}}
        <input type='file' name='avatar' accept='image/*' class='avatar-form__input'>
        <p class='avatar-form__size'>Размер файла не должен превышать 1МБ</p>
        {{{ Button 
          title='Сохранить аватар' 
          classes='link' 
        }}}
      </form>
    `;
  }
}

export default AvatarForm;
