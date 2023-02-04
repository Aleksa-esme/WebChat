import StickersAPI from 'api/StickersAPI';
import apiHasError from 'utils/API/apiHasError';
import type { DispatchStateHandler } from './types';

export const createPack: DispatchStateHandler<FormData> = async (dispatch, state, action) => {
  try {
    dispatch({ isLoading: true });

    const response = await StickersAPI.createPack(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseStickers = await StickersAPI.getPack();

    if (apiHasError(responseStickers)) {
      dispatch({ isLoading: false, loginFormError: responseStickers.reason });
      return;
    }

    dispatch({
      isLoading: false,
      loginFormError: null,
      stickers: responseStickers,
    });
  } catch (err) {
    console.error(err);
  }
};

export default createPack;
