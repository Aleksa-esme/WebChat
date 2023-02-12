import Component from 'utils/Component/Component';
import withRouter from 'utils/HOCs/withRouter';
import withChats from 'utils/HOCs/withChats';
import withStore from 'utils/HOCs/withStore';
import showBlock from 'utils/helpers/showBlock';
import {
  onCreateChat, onChangeAvatar, onSendFile, getChatAvatar, createStickerPack, onAddUser, onDeleteUser, onResize,
} from 'controllers/chatsController';
import * as ChatsAddSvg from 'assets/svg/chats-add.svg';
import * as StickerAddSvg from 'assets/svg/sticker-add.svg';
import * as UserSvg from 'assets/svg/user.svg';

class Chats extends Component {
  static componentName = 'Chats';

  constructor(props: unknown) {
    super(props);

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onShowModalStickers: () => showBlock('#modal-stickers'),
      onShowModalChat: () => showBlock('#modal-chat'),
      onCreateChat: (event: SubmitEvent) => onCreateChat(event),
      onChangeAvatar: (event: SubmitEvent) => onChangeAvatar(event),
      onSendFile: (event: SubmitEvent) => onSendFile(event),
      createStickerPack: (event: SubmitEvent) => createStickerPack(event),
      onAddUser: (event: SubmitEvent) => onAddUser(event),
      onDeleteUser: (event: SubmitEvent) => onDeleteUser(event),
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.addEventListener('load', onResize);
    } else {
      window.addEventListener('load', onResize);
      window.addEventListener('resize', onResize);
    }
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
        {{#if ${!!window.store.getState().chatState.chatList} }}
          <div class='chats'>
            <input type='text' class='chats__search' placeholder='Поиск'>

            {{{ ChatList }}}
            <div class='chats__buttons'>
              {{{ ButtonSvg
                svg='${ChatsAddSvg}' 
                alt='menu'
                type='button' 
                classes='svg-button'
                onClick=onShowModalChat 
              }}}
              {{{ ButtonSvg
                svg='${StickerAddSvg}' 
                alt='menu'
                type='button' 
                classes='svg-button'
                onClick=onShowModalStickers 
              }}}
              {{{ ButtonSvg
                svg='${UserSvg}' 
                alt='menu'
                type='button' 
                classes='svg-button'
                onClick=navigateProfile 
              }}}
            </div>
          </div>
        {{/if}}
        {{#if ${!!window.store.getState().chatState.chatField} }}
          {{#if ${window.store.getState().chatId !== null} }}
            {{{ ChatField avatar="${getChatAvatar()}" }}}
          {{else}}
            <div class='chat-field_empty'>
              <p>Выберите чат</p>
            </div>
          {{/if}}
        {{/if}}

        {{{ Modal 
          modal_id='modal-avatar' 
          avatar="${getChatAvatar()}" 
          onSubmit=onChangeAvatar 
          insert_component="AvatarForm 
            form_id='form_modal' 
            size='120' 
            url=avatar 
            onSubmit=onSubmit
          "
        }}}
        {{{ Modal 
          modal_id='modal-file' 
          name='file'
          onSubmit=onSendFile
          insert_component="FileForm 
            form_id='form_file' 
            name=name 
            onSubmit=onSubmit
          "
        }}}
        {{{ Modal 
          modal_id='modal-stickers' 
          name='stickers[]'
          isMultiple=true
          onSubmit=createStickerPack
          insert_component="FileForm 
            form_id='form_stickers' 
            name=name 
            isMultiple=isMultiple 
            onSubmit=onSubmit
          "
        }}}
        {{{ Modal 
          modal_id='modal-chat' 
          onSubmit=onCreateChat
          insert_component="ChatForm 
            form_id='form_chat' 
            onSubmit=onSubmit 
            label='Введите название чата' 
            name='chat_title' 
            title='Создать чат' 
          "
        }}}
        {{{ Modal 
          modal_id='modal-user-add' 
          onSubmit=onAddUser
          insert_component="ChatForm 
            form_id='form_user_add' 
            onSubmit=onSubmit 
            label='Введите логин пользователя' 
            name='user_add' 
            title='Добавить пользователя'
            isInfo=true
          "
        }}}
        {{{ Modal 
          modal_id='modal-user-del' 
          onSubmit=onDeleteUser
          insert_component="ChatForm 
            form_id='form_user-del' 
            onSubmit=onSubmit 
            label='Введите логин пользователя' 
            name='user_del' 
            title='Удалить пользователя' 
            isInfo=true
          "
        }}}

        {{#if ${!!window.store.getState().isLoading} }}
          {{{ Loader }}}
        {{/if}}
      </section>
    `;
  }
}

export default withRouter(withStore(withChats(Chats)));
