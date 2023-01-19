import ChatsAPI from 'api/ChatsApi';
import { UserDTO } from 'api/types';
import apiHasError from 'utils/API/apiHasError';
import type { Dispatch } from 'utils/Store';

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

  dispatch({ chatField: { id: action.chatId, users: responseUsers } });
};

export const chooseChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: string,
) => {
  dispatch({ isLoading: true });

  const response = await ChatsAPI.getChatUsers(action);

  dispatch({ isLoading: false, loginFormError: null });

  const chat = window.store.getState().chats?.filter(el => el.id.toString() === action);

  const chatFieldData = {
    id: action,
    title: chat[0]!.title,
    users: response,
    messages: [],
  };

  dispatch({ chatField: chatFieldData });
};
