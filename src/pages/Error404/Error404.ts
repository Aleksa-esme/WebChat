import Block from 'utils/Component/block';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';

class Error404 extends Block {
  static componentName = 'Error404';

  render() {
    return `
      <section class="http-error">
          <h6 class="http-error__number">404</h6>
          <p class="http-error__description">Не туда попали</p>
          {{{ Button title='Назад к чатам' classes="link link-small" }}}
      </section>
    `;
  }
}

export default withRouter(withStore(Error404));
