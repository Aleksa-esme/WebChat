import Component from 'utils/Component/Component';
import showBlock from 'utils/helpers/showBlock';

interface IModalProps {
  modal_id: String,
  avatar?: String,
  onSubmit?: () => void;
}

class Modal extends Component {
  static componentName = 'Modal';

  constructor({ modal_id, avatar, onSubmit }: IModalProps) {
    super({ modal_id, avatar, onSubmit });

    this.setProps({
      onCloseModal: () => showBlock(`#${modal_id}`),
    });
  }

  render() {
    return `
      <section class='wrapper' id={{ modal_id }}>
        <div class='modal'>
          <div class='modal__header'>
            {{{ Button title='X' classes='link' onClick=onCloseModal }}}
          </div>
          {{{ AvatarForm form_id='form_modal' size='120' url=avatar onSubmit=onSubmit }}}
        </div>
      </section>
    `;
  }
}

export default Modal;
