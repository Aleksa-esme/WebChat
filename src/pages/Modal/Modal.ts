import Component from 'utils/Component/Component';

class Modal extends Component {
  static componentName = 'Modal';

  render() {
    return `
      <section class='modal-wrapper'>
        <div class='modal'>
          <h6 class='modal__heading'>Файл загружен</h6>
          <p>pic.jpg</p>
          {{{ Button title='Поменять' classes='button modal__button' }}}
        </div>
      </section>
    `;
  }
}

export default Modal;
