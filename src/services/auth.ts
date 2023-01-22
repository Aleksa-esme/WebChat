import AuthAPI from 'api/AuthApi';
import ChatsAPI from 'api/ChatsApi';
import { UserDTO } from 'api/types';
import apiHasError from 'utils/API/apiHasError';
import transformUser from 'utils/API/apiTransformers';
import type { Dispatch } from 'utils/Store';

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
  dispatch({ isLoading: true });

  await AuthAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go('/login');
};

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload,
) => {
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

  window.router.go('/profile');
};

export const register = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: RegisterPayload,
) => {
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

  window.router.go('/');
};
