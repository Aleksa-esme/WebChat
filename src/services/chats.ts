import ChatsAPI from 'api/ChatsAPI';
import UserAPI from 'api/UserAPI';
import apiHasError from 'utils/API/apiHasError';
import type { Dispatch } from 'utils/Store';
import Messages from './messages';

type CreateChatPayload = {
  title: string;
};

type DeleteChatPayload = {
  chatId: string;
};

type UserPayload = {
  user: string;
  chatId: string;
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreateChatPayload,
) => {
  dispatch({ isLoading: true });

  const response = await ChatsAPI.create(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseChats = await ChatsAPI.getChats();

  dispatch({
    isLoading: false,
    loginFormError: null,
    chats: responseChats,
  });
};

export const chooseChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: string,
) => {
  dispatch({ isLoading: true });

  const responseChats = await ChatsAPI.getChatUsers(action);

  const responseToken = await ChatsAPI.getToken(action);

  await Messages.connect(Number(action), responseToken.token, '0');

  const chat = window.store.getState().chats?.filter(el => el.id.toString() === action);

  dispatch({
    isLoading: false,
    loginFormError: null,
    chatId: action,
    chatTitle: chat[0]!.title,
    users: responseChats,
  });
};

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: DeleteChatPayload,
) => {
  dispatch({ isLoading: true });

  const response = await ChatsAPI.delete({ chatId: Number(action) });

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  Messages.close();

  const responseChats = await ChatsAPI.getChats();

  dispatch({
    isLoading: false,
    loginFormError: null,
    chatId: null,
    chats: responseChats,
  });
};

export const addUser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action:UserPayload,
) => {
  dispatch({ isLoading: true });

  const user = await UserAPI.search({ login: action.user });

  const response = await ChatsAPI.addUser({ users: [user[0].id], chatId: action.chatId });

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUsers = await ChatsAPI.getChatUsers(action.chatId);

  dispatch({
    isLoading: false,
    loginFormError: null,
    users: responseUsers,
  });
};

export const deleteUser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UserPayload,
) => {
  dispatch({ isLoading: true });

  const user = await UserAPI.search({ login: action.user });

  const response = await ChatsAPI.deleteUser({ users: [user[0].id], chatId: action.chatId });

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUsers = await ChatsAPI.getChatUsers(action.chatId);

  dispatch({
    isLoading: false,
    loginFormError: null,
    users: responseUsers,
  });
};
