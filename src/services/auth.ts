import AuthAPI from 'api/AuthAPI';
import ChatsAPI from 'api/ChatsAPI';
import { UserDTO } from 'api/types';
import apiHasError from 'utils/API/apiHasError';
import transformUser from 'utils/API/apiTransformers';
import type { Dispatch } from 'utils/Store/Store';
import type { DispatchStateHandler } from './types';

type LoginPayload = {
  login: string;
  password: string;
};

type RegisterPayload = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  try {
    dispatch({ isLoading: true });

    await AuthAPI.logout();

    dispatch({ isLoading: false, user: null });
  } catch (err) {
    console.error(err);
  } finally {
    window.router.go('/login');
  }
};

export const login: DispatchStateHandler<LoginPayload> = async (dispatch, state, action) => {
  try {
    dispatch({ isLoading: true });

    const response = await AuthAPI.login(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseUser = await AuthAPI.me();

    dispatch({ isLoading: false, loginFormError: null });

    if (apiHasError(response)) {
      dispatch(logout);
      return;
    }
    const responseChats = await ChatsAPI.getChats();

    if (apiHasError(responseChats)) {
      console.log(responseChats);
      return;
    }

    dispatch({
      isLoading: false,
      loginFormError: null,
      user: transformUser(responseUser as UserDTO),
      chats: responseChats,
    });
  } catch (err) {
    console.error(err);
  } finally {
    window.router.go('/profile');
  }
};

export const register: DispatchStateHandler<RegisterPayload> = async (dispatch, state, action) => {
  try {
    dispatch({ isLoading: true });

    const response = await AuthAPI.register(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseUser = await AuthAPI.me();

    dispatch({
      isLoading: false,
      loginFormError: null,
      user: transformUser(responseUser as UserDTO),
    });
  } catch (err) {
    console.error(err);
  } finally {
    window.router.go('/');
  }
};
