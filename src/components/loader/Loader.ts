import Block from 'utils/Component/block';

class Loader extends Block {
  static componentName = 'Loader';

  constructor(props) {
    super(props);
  }

  render() {
    return `
      <div class='loader__wrapper'>
        <div class="lds-dual-ring"></div>
      </div>
    `;
  }
}

export default Loader;
