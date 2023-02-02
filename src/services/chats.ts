import ChatsAPI from 'api/ChatsAPI';
import UserAPI from 'api/UserAPI';
import apiHasError from 'utils/API/apiHasError';
import type { Dispatch } from 'utils/Store/Store';
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
  try {
    dispatch({ isLoading: true });

    const response = await ChatsAPI.create(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseChats = await ChatsAPI.getChats();

    if (apiHasError(responseChats)) {
      dispatch({ isLoading: false, loginFormError: responseChats.reason });
      return;
    }

    dispatch({
      isLoading: false,
      loginFormError: null,
      chats: responseChats,
    });
  } catch (err) {
    console.error(err);
  }
};

export const chooseChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: string,
) => {
  try {
    dispatch({ isLoading: true });

    const responseChats = await ChatsAPI.getChatUsers(action);

    if (apiHasError(responseChats)) {
      dispatch({ isLoading: false, loginFormError: responseChats.reason });
      return;
    }

    const responseToken = await ChatsAPI.getToken(action);

    if (apiHasError(responseToken)) {
      dispatch({ isLoading: false, loginFormError: responseToken.reason });
      return;
    }

    await Messages.connect(Number(action), responseToken.token, '0');

    const chat = window.store.getState().chats?.filter(el => el.id.toString() === action);

    dispatch({
      isLoading: false,
      loginFormError: null,
      chatId: action,
      chatTitle: chat![0].title,
      users: responseChats,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: DeleteChatPayload,
) => {
  try {
    dispatch({ isLoading: true });

    const response = await ChatsAPI.delete({ chatId: Number(action) });

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    Messages.close();

    const responseChats = await ChatsAPI.getChats();

    if (apiHasError(responseChats)) {
      dispatch({ isLoading: false, loginFormError: responseChats.reason });
      return;
    }

    dispatch({
      isLoading: false,
      loginFormError: null,
      chatId: null,
      chats: responseChats,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addUser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action:UserPayload,
) => {
  try {
    dispatch({ isLoading: true });

    const user = await UserAPI.search({ login: action.user });

    if (apiHasError(user)) {
      dispatch({ isLoading: false, loginFormError: user.reason });
      return;
    }

    const response = await ChatsAPI.addUser({ users: [user[0].id], chatId: action.chatId });

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseUsers = await ChatsAPI.getChatUsers(action.chatId);

    if (apiHasError(responseUsers)) {
      dispatch({ isLoading: false, loginFormError: responseUsers.reason });
      return;
    }

    dispatch({
      isLoading: false,
      loginFormError: null,
      users: responseUsers,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UserPayload,
) => {
  try {
    dispatch({ isLoading: true });

    const user = await UserAPI.search({ login: action.user });

    if (apiHasError(user)) {
      dispatch({ isLoading: false, loginFormError: user.reason });
      return;
    }

    const response = await ChatsAPI.deleteUser({ users: [user[0].id], chatId: action.chatId });

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseUsers = await ChatsAPI.getChatUsers(action.chatId);

    if (apiHasError(responseUsers)) {
      dispatch({ isLoading: false, loginFormError: responseUsers.reason });
      return;
    }

    dispatch({
      isLoading: false,
      loginFormError: null,
      users: responseUsers,
    });
  } catch (err) {
    console.error(err);
  }
};
