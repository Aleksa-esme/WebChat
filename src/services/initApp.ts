import authAPI from 'api/auth';
import { UserDTO } from 'api/types';
import apiHasError from 'utils/apiHasError';
import transformUser from 'utils/apiTransformers';
import type { Dispatch } from 'utils/Store';
import defaultState from '../store';

async function initApp(dispatch: Dispatch<AppState>) {
  // Ручкая задержка для демонстрации загрузочного экрана
  // eslint-disable-next-line no-promise-executor-return
  await new Promise(r => setTimeout(r, 700));

  try {
    const response = await authAPI.me();

    console.log(apiHasError(response));
    if (apiHasError(response)) {
      console.log(response);
      return;
    }
    console.log(response);
    dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}

export default initApp;
