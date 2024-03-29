import UserAPI from 'api/UserAPI';
import { UserDTO } from 'api/types';
import apiHasError from 'utils/API/apiHasError';
import transformUser from 'utils/API/apiTransformers';
import type { DispatchStateHandler } from './types';

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

export const changeData: DispatchStateHandler<DataPayload> = async (dispatch, state, action) => {
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

export const changePassword: DispatchStateHandler<PasswordPayload> = async (dispatch, state, action) => {
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

export const changeAvatar: DispatchStateHandler<FormData> = async (dispatch, state, action) => {
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
