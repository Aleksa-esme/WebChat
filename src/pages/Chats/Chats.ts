import Component from 'utils/Component/Component';
import withRouter from 'utils/HOCs/withRouter';
import withChats from 'utils/HOCs/withChats';
import withStore from 'utils/HOCs/withStore';
import { createChat, changeAvatar } from 'services/chats';
import sendFile from 'services/resources';
import Messages from 'services/messages';

class Chats extends Component {
  static componentName = 'Chats';

  constructor(props: unknown) {
    super(props);

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onCreateChat: () => this.onCreateChat(),
      onChangeAvatar: (event: SubmitEvent) => this.onChangeAvatar(event),
      onSendFile: (event: SubmitEvent) => this.onSendFile(event),
    });
  }

  // componentDidUpdate() {
  //   // брать из HOC
  //   return window.store.getState().screen === Screens.ChatsPage;
  // }

  onCreateChat() {
    const chatData = prompt('Название чата');
    if (!!chatData) this.props.store.dispatch(createChat, { title: chatData });
  }

  onChangeAvatar(event: SubmitEvent) {
    event.preventDefault();

    const avatar = document.querySelector('input[name="avatar"]') as HTMLInputElement;
    const curFile = avatar.files![0];
    const chatId = window.store.getState().chatId;

    const formData = new FormData();
    formData.set('avatar', curFile);
    formData.set('chatId', chatId!);

    if (!!curFile && curFile.size <= 1048576) this.props.store.dispatch(changeAvatar, formData);
    else if (!!curFile && curFile.size > 1048576) alert('Размер файла не должен превышать 1МБ');
    else alert('Файл не выбран');
  }

  onSendFile(event: SubmitEvent) {
    event.preventDefault();

    const file = document.querySelector('input[name="file"]') as HTMLInputElement;
    const curFile = file.files![0];

    const formData = new FormData();
    formData.set('resource', curFile);

    if (!!curFile && curFile.size <= 1048576) {
      this.props.store.dispatch(sendFile, formData);

      setTimeout(() => {
        const fileId = window.store.getState().fileId!;

        Messages.sendMessage(fileId, 'file');
      }, 1000);
    } else if (!!curFile && curFile.size > 1048576) {
      alert('Размер файла не должен превышать 1МБ');
    } else {
      alert('Файл не выбран');
    }
  }

  getChatAvatar() {
    const chats = window.store.getState().chats;
    const chat = chats?.find(el => el.id === Number(window.store.getState().chatId));
    return chat?.avatar;
  }

  render() {
    if (this.props.chats === 'undefined') {
      return '{{{ Loader }}}';
    }

    return `
      <section class='chat-page'>
        <div class='chats'>
          <div class='chats__buttons'>
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
          {{{ ChatField avatar="${this.getChatAvatar()}" }}}
        {{else}}
          <div class='chat-field_empty'>
            <p>Выберите чат</p>
          </div>
        {{/if}}
        {{{ Modal 
          modal_id='modal-avatar' 
          avatar="${this.getChatAvatar()}" 
          onSubmit=onChangeAvatar 
          insert_component="AvatarForm form_id='form_modal' size='120' url=avatar onSubmit=onSubmit"
        }}}
        {{{ Modal 
          modal_id='modal-file' 
          onSubmit=onSendFile
          insert_component="FileForm form_id='form_file' onSubmit=onSubmit"
        }}}
        {{#if ${!!window.store.getState().isLoading} }}
          {{{ Loader }}}
        {{/if}}
      </section>
    `;
  }
}

export default withRouter(withStore(withChats(Chats)));
