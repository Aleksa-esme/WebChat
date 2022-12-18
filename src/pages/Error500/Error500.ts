import Block from '../../utils/Block';

class Error500 extends Block {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    console.log('готов');
  }

  render() {
    return `
      <section class="http-error">
          <h6 class="http-error__number">500</h6>
          <p class="http-error__description">Мы уже фиксим</p>
          {{{ Link title='Назад к чатам' class="link-small" }}}
      </section>
    `;
  }
}

export default Error500;
