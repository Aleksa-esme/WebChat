import ChatsAPI from 'api/ChatsAPI';
import UserAPI from 'api/UserAPI';
import apiHasError from 'utils/API/apiHasError';
import type { DispatchStateHandler } from './types';
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

export const createChat: DispatchStateHandler<CreateChatPayload> = async (dispatch, state, action) => {
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

export const chooseChat: DispatchStateHandler<string> = async (dispatch, state, action) => {
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

export const changeAvatar: DispatchStateHandler<FormData> = async (dispatch, state, action) => {
  try {
    dispatch({ isLoading: true });

    const response = await ChatsAPI.avatar(action);

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

export const deleteChat: DispatchStateHandler<DeleteChatPayload> = async (dispatch, state, action) => {
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

export const addUser: DispatchStateHandler<UserPayload> = async (dispatch, state, action) => {
  try {
    dispatch({ isLoading: true });

    const users = await UserAPI.search({ login: action.user });

    if (apiHasError(users)) {
      dispatch({ isLoading: false, loginFormError: users.reason });
      return;
    }

    if (users.length !== 0) {
      const user = users.filter((el: any) => el.login === action.user);

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
    } else {
      dispatch({
        isLoading: false,
        loginFormError: null,
      });
      alert('Нет такого пользователя');
      throw new Error('Нет такого пользователя');
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser: DispatchStateHandler<UserPayload> = async (dispatch, state, action) => {
  try {
    dispatch({ isLoading: true });

    const users = await UserAPI.search({ login: action.user });

    if (apiHasError(users)) {
      dispatch({ isLoading: false, loginFormError: users.reason });
      return;
    }
    if (users.length !== 0) {
      const user = users.filter((el: any) => el.login === action.user);

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
    } else {
      dispatch({
        isLoading: false,
        loginFormError: null,
      });
      alert('Нет такого пользователя');
      throw new Error('Нет такого пользователя');
    }
  } catch (err) {
    console.error(err);
  }
};
