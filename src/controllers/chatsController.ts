import sendFile from 'services/resources';
import Messages from 'services/messages';
import { createPack } from 'services/stickers';
import { validateForm } from 'utils/Validation/ValidForm';
import {
  createChat, changeAvatar, chooseChat, addUser, deleteChat, deleteUser,
} from 'services/chats';

// Chat list
export const onCreateChat = (event: SubmitEvent) => {
  event.preventDefault();

  const isError = validateForm(event, 'form_chat');

  if (!isError) {
    const input = document.querySelector('input[name="chat_title"]') as HTMLInputElement;
    if (!!input.value) window.store.dispatch(createChat, { title: input.value });
  }
};

export const onChooseChat = (event: Event) => {
  const target = event.currentTarget as HTMLElement;
  const chatId = target!.id;
  window.store.dispatch(chooseChat, chatId);

  const windowInnerWidth = window.innerWidth;

  if (windowInnerWidth <= 768) {
    setTimeout(() => {
      window.store.dispatch({
        chatState: {
          chatList: false,
          chatField: true,
        },
      });
    }, 1000);
  }
};

// Chat info
export const getUsers = (): string => {
  const users = window.store.getState().users;
  const string = users.reduce((result, user, index) => `${result}${user.login}${index < users.length - 1 ? ', ' : ''}`, '');
  return string;
};

export const getChatAvatar = () => {
  const chats = window.store.getState().chats;
  const chat = chats?.find(el => el.id === Number(window.store.getState().chatId));
  return chat?.avatar;
};

// Chat menu
export const onAddUser = (event: SubmitEvent) => {
  event.preventDefault();

  const isError = validateForm(event, 'form_user_add');

  if (!isError) {
    const chatId = window.store.getState().chatId;
    const input = document.querySelector('input[name="user_add"]') as HTMLInputElement;
    if (!!input.value) window.store.dispatch(addUser, { user: input.value, chatId });
  }
};

export const onDeleteUser = (event: SubmitEvent) => {
  event.preventDefault();

  const isError = validateForm(event, 'form_user-del');

  if (!isError) {
    const chatId = window.store.getState().chatId;
    const input = document.querySelector('input[name="user_del"]') as HTMLInputElement;
    if (!!input.value) window.store.dispatch(deleteUser, { user: input.value, chatId });
  }
};

export const onDeleteChat = () => {
  const chatId = window.store.getState().chatId;
  window.store.dispatch(deleteChat, chatId);
};

export const onChangeAvatar = (event: SubmitEvent) => {
  event.preventDefault();

  const avatar = document.querySelector('input[name="avatar"]') as HTMLInputElement;
  const curFile = avatar.files![0];
  const chatId = window.store.getState().chatId;

  const formData = new FormData();
  formData.set('avatar', curFile);
  formData.set('chatId', chatId!);

  if (!!curFile && curFile.size <= 1048576) window.store.dispatch(changeAvatar, formData);
  else if (!!curFile && curFile.size > 1048576) alert('Размер файла не должен превышать 1МБ');
  else alert('Файл не выбран');
};

// Send Messages
export const onSendMessage = (event: SubmitEvent) => {
  event.preventDefault();
  const isError = validateForm(event, 'form');
  if (!isError) {
    const outgoingMessage = document.querySelector('textarea[name="message"]') as HTMLInputElement;
    if (!!outgoingMessage) {
      Messages.sendMessage(outgoingMessage.value);
      outgoingMessage.value = '';
    }
  }
};

export const onSendMessageByEnter = (event: any) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    onSendMessage(event);
  }
};

export const onSendFile = (event: SubmitEvent) => {
  event.preventDefault();

  const file = document.querySelector('input[name="file"]') as HTMLInputElement;
  const curFile = file.files![0];

  const formData = new FormData();
  formData.set('resource', curFile);

  if (!!curFile && curFile.size <= 1048576) {
    window.store.dispatch(sendFile, formData);

    setTimeout(() => {
      const fileId = window.store.getState().fileId!;

      Messages.sendMessage(fileId, 'file');
    }, 1000);
  } else if (!!curFile && curFile.size > 1048576) {
    alert('Размер файла не должен превышать 1МБ');
  } else {
    alert('Файл не выбран');
  }
};

// Chat messages
export const getMessageUser = (id: number): string => {
  let messageUser;
  const chatUsers = window.store.getState().users;
  if (!!chatUsers && typeof id !== 'undefined') messageUser = chatUsers!.find(user => user.id === id)!.login;
  else messageUser = '';

  return messageUser;
};

export const checkFile = (el: any) => {
  let path;
  if (el.type === 'file') path = `https://ya-praktikum.tech/api/v2/resources${el.file.path}`;
  else path = '';
  return path;
};

export const scrollToBottom = () => {
  const block = document.querySelector('.messages-list');
  if (block) block!.scrollTop = block!.scrollHeight;
};

// Stickers
export const createStickerPack = (event: SubmitEvent) => {
  event.preventDefault();

  const input = document.querySelector('input[name="stickers[]"]') as HTMLInputElement;
  const files = input.files;
  const formData = new FormData();

  if (files) Array.from(files).forEach(file => formData.append('resource', file));

  const title = prompt('Название стикерпака');
  if (title) formData.append('title', title);
  window.store.dispatch(createPack, formData);
};

// async getStickers() {
//   const a = await StickersAPI.getPack();
//   console.log(a)
//   // '<a href="https://www.flaticon.com/ru/free-stickers/" title="люди стикеры">Люди стикеры от Stickers - Flaticon</a>'
// }

// Chat visibility
export const onResize = () => {
  const windowInnerWidth = window.innerWidth;

  if (windowInnerWidth > 768) {
    window.store.dispatch({
      chatState: {
        chatList: true,
        chatField: true,
      },
    });
  } else if (windowInnerWidth <= 768) {
    if (!!window.store.getState().chatId) {
      window.store.dispatch({
        chatState: {
          chatList: false,
          chatField: true,
        },
      });
    } else {
      window.store.dispatch({
        chatState: {
          chatList: true,
          chatField: false,
        },
      });
    }
  }
};

export const showChats = () => {
  window.store.dispatch({
    chatState: {
      chatList: true,
      chatField: false,
    },
  });
};
