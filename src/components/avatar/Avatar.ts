import Component from 'utils/Component/Component';

interface IAvatarProps {
  size: String,
  url?: String,
}

class Avatar extends Component {
  static componentName = 'Avatar';

  constructor({ size, url = 'null' }: IAvatarProps) {
    super({ size, url });
  }

  checkURL(url: String): String {
    if (url === 'null') url = `https://dummyimage.com/${this.props.size}x${this.props.size}/EFEFEF`;
    else url = `https://ya-praktikum.tech/api/v2/resources${url}`;
    return url;
  }

  render() {
    return `
      <div 
        class='avatar' 
        style='width: {{ size }}px; height: {{ size }}px; background-image: url("${this.checkURL(this.props.url)}")'
      >
      </div>
    `;
  }
}

export default Avatar;
