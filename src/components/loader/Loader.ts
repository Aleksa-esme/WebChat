import Component from 'utils/Component/Component';

class Loader extends Component {
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
