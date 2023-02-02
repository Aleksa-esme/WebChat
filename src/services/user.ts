import UserAPI from 'api/UserAPI';
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
  try {
    dispatch({ isLoading: true });

    const response = await UserAPI.data(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseUser = await UserAPI.user(response.id);

    if (apiHasError(responseUser)) {
      dispatch({ isLoading: false, loginFormError: responseUser.reason });
      return;
    }

    dispatch({
      isLoading: false,
      loginFormError: null,
      user: transformUser(responseUser as UserDTO),
    });
  } catch (err) {
    console.error(err);
  }
};

export const changePassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: PasswordPayload,
) => {
  try {
    dispatch({ isLoading: true });

    const response = await UserAPI.password(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    dispatch({ isLoading: false, loginFormError: null });
  } catch (err) {
    console.error(err);
  }
};

export const changeAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: any,
) => {
  try {
    dispatch({ isLoading: true });

    const response = await UserAPI.avatar(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseUser = await UserAPI.user(response.id);

    if (apiHasError(responseUser)) {
      dispatch({ isLoading: false, loginFormError: responseUser.reason });
      return;
    }

    dispatch({
      isLoading: false,
      loginFormError: null,
      user: transformUser(responseUser as UserDTO),
    });
  } catch (err) {
    console.error(err);
  }
};
