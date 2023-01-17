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

    this.setProps({
      url: this.checkURL(url),
    });
  }

  checkURL(url: String): String {
    if (url === 'null') url = 'https://dummyimage.com/160x160/EFEFEF';
    return url;
  }

  render() {
    return `
      <form id={{form_id}} class="avatar">
        <div class="avatar__photo" style="background-image: url('{{url}}')">
        <img src={{url}} alt={{alt}}>
        </div>
        {{#if ${this.props.isVisible} }}
          <input type="file" name="avatar" accept="image/*" class="avatar__input">
          <input type="submit">
        {{/if}}
      </form>
    `;
  }
}

export default Avatar;
