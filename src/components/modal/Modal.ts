import Component from 'utils/Component/Component';
import showBlock from 'utils/helpers/showBlock';

interface IModalProps {
  modal_id: String,
  avatar?: String,
  name: String;
  isMultiple: Boolean;
  insert_component: String;
  onSubmit?: () => void;
}

class Modal extends Component {
  static componentName = 'Modal';

  constructor({
    modal_id, avatar, name, isMultiple, insert_component, onSubmit,
  }: IModalProps) {
    super({
      modal_id, avatar, name, isMultiple, insert_component, onSubmit,
    });

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
          {{{ ${this.props.insert_component} }}}
        </div>
      </section>
    `;
  }
}

export default Modal;
