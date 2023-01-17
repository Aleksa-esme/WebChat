import AuthAPI from 'api/AuthApi';
import { UserDTO } from 'api/types';
import apiHasError from 'utils/API/apiHasError';
import transformUser from 'utils/API/apiTransformers';
import type { Dispatch } from 'utils/Store';

async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await AuthAPI.me();

    console.log(apiHasError(response));
    if (apiHasError(response)) {
      console.log(response);
      return;
    }
    console.log('response');
    console.log(response);
    dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}

export default initApp;
