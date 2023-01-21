import ChatsAPI from 'api/ChatsApi';
import apiHasError from 'utils/API/apiHasError';
import type { Dispatch } from 'utils/Store';
import Messages from './messages';

type CreateChatPayload = {
  title: string;
};

type DeleteChatPayload = {
  chatId: string;
};

type AddUserPayload = {
  users: Array<number>;
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

  dispatch({ isLoading: false, loginFormError: null });

  dispatch({ chats: responseChats });
};

export const addUser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: AddUserPayload,
) => {
  dispatch({ isLoading: true });

  const response = await ChatsAPI.addUser(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUsers = await ChatsAPI.getChatUsers(action.chatId);

  dispatch({ isLoading: false, loginFormError: null });

  dispatch({ users: responseUsers });
};

export const chooseChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: string,
) => {
  dispatch({ isLoading: true });

  const responseChats = await ChatsAPI.getChatUsers(action);

  dispatch({ isLoading: false, loginFormError: null });

  const responseToken = await ChatsAPI.getToken(action);

  await Messages.connect(Number(action), responseToken.token, '0');

  const chat = window.store.getState().chats?.filter(el => el.id.toString() === action);

  dispatch({ chatId: action });
  dispatch({ chatTitle: chat[0]!.title });
  dispatch({ users: responseChats });
};
