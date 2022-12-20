import Block from 'utils/Block';

class Modal extends Block {
  static componentName = 'Modal';
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    console.log('готов');
  }

  render() {
    return `
      <section class="modal-wrapper">
          <div class="modal">
              <h6 class="modal__heading">Файл загружен</h6>
              <p>pic.jpg</p>
              {{{ Button title='Поменять' class='modal__button' }}}
          </div>
      </section>
    `;
  }
}

export default Modal;
