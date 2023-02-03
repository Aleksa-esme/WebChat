import ResourcesAPI from 'api/ResourcesAPI';
import apiHasError from 'utils/API/apiHasError';
import type { DispatchStateHandler } from './types';

const sendFile: DispatchStateHandler<FormData> = async (dispatch, state, action) => {
  try {
    dispatch({ isLoading: true });

    const response = await ResourcesAPI.send(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    dispatch({
      isLoading: false,
      loginFormError: null,
      fileId: response.id,
    });
  } catch (err) {
    console.error(err);
  }
};

export default sendFile;
