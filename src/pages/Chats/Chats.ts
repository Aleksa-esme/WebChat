import Component from 'utils/Component/Component';
import withRouter from 'utils/HOCs/withRouter';
import withChats from 'utils/HOCs/withChats';
import withStore from 'utils/HOCs/withStore';
import showBlock from 'utils/helpers/showBlock';
import {
  onCreateChat, onChangeAvatar, onSendFile, getChatAvatar, createStickerPack,
} from 'controllers/chatsController';

class Chats extends Component {
  static componentName = 'Chats';

  constructor(props: unknown) {
    super(props);

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onShowModal: () => showBlock('#modal-stickers'),
      onCreateChat: () => onCreateChat(),
      onChangeAvatar: (event: SubmitEvent) => onChangeAvatar(event),
      onSendFile: (event: SubmitEvent) => onSendFile(event),
      createStickerPack: (event: SubmitEvent) => createStickerPack(event),
    });
  }

  // componentDidUpdate() {
  //   // брать из HOC
  //   return window.store.getState().screen === Screens.ChatsPage;
  // }

  render() {
    if (this.props.chats === 'undefined') {
      return '{{{ Loader }}}';
    }

    return `
      <section class='chat-page'>
        <div class='chats'>
          <div class='chats__buttons'>
            {{{ Button 
              title='Стикеры' 
              classes='link link-small chats__link' 
              onClick=onShowModal
            }}}
            {{{ Button 
              title='Создать чат' 
              classes='link link-small chats__link' 
              onClick=onCreateChat
            }}}
            {{{ Button 
              title='Профиль >' 
              classes='link link-small chats__link' 
              onClick=navigateProfile
            }}}
          </div>
          <input type='text' class='chats__search' placeholder='Поиск'>
          {{{ ChatList }}}
        </div>
        {{#if ${window.store.getState().chatId !== null} }}
          {{{ ChatField avatar="${getChatAvatar()}" }}}
        {{else}}
          <div class='chat-field_empty'>
            <p>Выберите чат</p>
          </div>
        {{/if}}

        {{{ Modal 
          modal_id='modal-avatar' 
          avatar="${getChatAvatar()}" 
          onSubmit=onChangeAvatar 
          insert_component="AvatarForm form_id='form_modal' size='120' url=avatar onSubmit=onSubmit"
        }}}
        {{{ Modal 
          modal_id='modal-file' 
          name='file'
          onSubmit=onSendFile
          insert_component="FileForm form_id='form_file' name=name onSubmit=onSubmit"
        }}}
        {{{ Modal 
          modal_id='modal-stickers' 
          name='stickers[]'
          isMultiple=true
          onSubmit=createStickerPack
          insert_component="FileForm form_id='form_stickers' name=name isMultiple=isMultiple onSubmit=onSubmit"
        }}}

        {{#if ${!!window.store.getState().isLoading} }}
          {{{ Loader }}}
        {{/if}}
      </section>
    `;
  }
}

export default withRouter(withStore(withChats(Chats)));
