import Block from 'utils/Component/block';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';

class Error500 extends Block {
  static componentName = 'Error500';

  render() {
    return `
      <section class='http-error'>
          <h6 class='http-error__number'>500</h6>
          <p class='http-error__description'>Мы уже фиксим</p>
          {{{ Button title='Назад к чатам' classes='link link-small' }}}
      </section>
    `;
  }
}

export default withRouter(withStore(Error500));
