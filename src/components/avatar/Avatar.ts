import Block from 'utils/Component/block';

interface IAvatarProps {
  form_id: String,
  isVisible?: Boolean,
  url?: String,
  onSubmit?: () => void;
}

class Avatar extends Block {
  static componentName = 'Avatar';

  constructor({
    form_id, isVisible = false, url, onSubmit,
  }: IAvatarProps) {
    super({
      form_id,
      isVisible,
      url,
      events: {
        submit: onSubmit,
      },
    });
  }

  render() {
    return `
      <form id={{ form_id }} class='avatar'>
        <div class='avatar__photo' style='background-image: url("{{ url }}")'></div>
        {{#if ${this.props.isVisible} }}
          <input type='file' name='avatar' accept='image/*' class='avatar__input'>
          <p class='avatar__size'>Размер файла не должен превышать 1МБ</p>
          {{{ Button 
            title='Изменить аватар' 
            classes='link' 
          }}}
        {{/if}}
      </form>
    `;
  }
}

export default Avatar;
