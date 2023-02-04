import sendFile from 'services/resources';
import Messages from 'services/messages';
import { createPack } from 'services/stickers';
import { validateForm } from 'utils/Validation/ValidForm';
import {
  createChat, changeAvatar, chooseChat, addUser, deleteChat, deleteUser,
} from 'services/chats';

// Chat list
export const onCreateChat = () => {
  const chatData = prompt('Название чата');
  if (!!chatData) window.store.dispatch(createChat, { title: chatData });
};

export const onChooseChat = (event: Event) => {
  const target = event.currentTarget as HTMLElement;
  const chatId = target!.id;
  window.store.dispatch(chooseChat, chatId);
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
export const onAddUser = () => {
  const chatId = window.store.getState().chatId;
  const login = prompt('Введите логин пользователя');
  if (!!login) window.store.dispatch(addUser, { user: login, chatId });
};

export const onDeleteUser = () => {
  const chatId = window.store.getState().chatId;
  const login = prompt('Введите логин пользователя, которого хотите удалить');
  if (!!login) window.store.dispatch(deleteUser, { user: login, chatId });
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
  const isError = validateForm(event);
  if (!isError) {
    const outgoingMessage = document.querySelector('textarea[name="message"]') as HTMLInputElement;
    if (!!outgoingMessage) {
      Messages.sendMessage(outgoingMessage.value);
      outgoingMessage.value = '';
    }
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
