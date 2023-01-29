import UserAPI from 'api/UserApi';
import { UserDTO } from 'api/types';
import apiHasError from 'utils/API/apiHasError';
import transformUser from 'utils/API/apiTransformers';
import type { Dispatch } from 'utils/Store/Store';

type DataPayload = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

type PasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export const changeData = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: DataPayload,
) => {
  dispatch({ isLoading: true });

  const response = await UserAPI.data(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await UserAPI.user(response.id);

  dispatch({
    isLoading: false,
    loginFormError: null,
    user: transformUser(responseUser as UserDTO),
  });
};

export const changePassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: PasswordPayload,
) => {
  dispatch({ isLoading: true });

  const response = await UserAPI.password(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  dispatch({ isLoading: false, loginFormError: null });
};

export const changeAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action,
) => {
  dispatch({ isLoading: true });

  const response = await UserAPI.avatar(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }
  const responseUser = await UserAPI.user(response.id);

  dispatch({
    isLoading: false,
    loginFormError: null,
    user: transformUser(responseUser as UserDTO),
  });
};
