import Component from 'utils/Component/Component';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import * as FileSvg from 'assets/svg/file.svg';
import * as StickerSvg from 'assets/svg/sticker.svg';
import { validFocusField } from 'utils/Validation/ValidForm';
import showBlock from 'utils/helpers/showBlock';
import { onSendMessageByEnter } from 'controllers/chatsController';

interface IMessageFieldProps {
  onSubmit?: () => void;
}

class MessageField extends Component {
  static componentName = 'MessageForm';

  constructor({ onSubmit }: IMessageFieldProps) {
    super({
      events: {
        submit: onSubmit,
      },
    });

    this.setProps({
      onFocus: (event: Event) => validFocusField(event, 'form'),
      onShowModalFile: () => showBlock('#modal-file'),
      onShowModalStickers: () => showBlock('#modal-stickers'),
      onKeydown: (event: any) => onSendMessageByEnter(event),
    });
  }

  render() {
    return `
      <form class='messages-send' id='form'>
          {{{ ButtonSvg svg='${StickerSvg}' alt='add sticker' type='button' classes='svg-button' onClick=onShowModalStickers }}} 
          {{{ ButtonSvg svg='${FileSvg}' alt='add file' type='button' classes='svg-button rotate-svg' onClick=onShowModalFile }}} 
          {{{ MessageField onFocus=onFocus onKeydown=onKeydown }}}
          {{{ ButtonSvg svg='${ArrowButton}' alt='send' type='submit' classes='svg-button rotate-svg' }}} 
      </form>
    `;
  }
}

export default MessageField;
