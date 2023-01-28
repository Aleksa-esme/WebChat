import Block from 'utils/Component/Block';

class Loader extends Block {
  static componentName = 'Loader';

  render() {
    return `
      <div class='loader__wrapper'>
        <div class="lds-dual-ring"></div>
      </div>
    `;
  }
}

export default Loader;
