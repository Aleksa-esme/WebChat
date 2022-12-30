import Block from 'utils/block';

interface IAvatarProps {
  isVisible?: Boolean
}

class Avatar extends Block {
  static componentName = 'Avatar';

  constructor({ isVisible = false }: IAvatarProps) {
    super({
      isVisible,
    });
  }

  render() {
    return `
      <div class="avatar">
        <div class="avatar__photo"></div>
        {{#if ${this.props.isVisible} }}
          <input type="file" name="avatar" accept="image/png, image/jpeg" class="avatar__input">
        {{/if}}
      </div>
    `;
  }
}

export default Avatar;
