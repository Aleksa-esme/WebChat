import Block from '../../utils/Block';

class Error404 extends Block {
  static componentName = 'Error404';
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    console.log('готов');
  }

  render() {
    return `
      <section class="http-error">
          <h6 class="http-error__number">404</h6>
          <p class="http-error__description">Не туда попали</p>
          {{{ Link title='Назад к чатам' class="link-small" }}}
      </section>
    `;
  }
}

export default Error404;
