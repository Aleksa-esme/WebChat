import AuthAPI from 'api/AuthApi';
import ChatsAPI from 'api/ChatsApi';
import { UserDTO } from 'api/types';
import apiHasError from 'utils/API/apiHasError';
import transformUser from 'utils/API/apiTransformers';
import type { Dispatch } from 'utils/Store';

async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await AuthAPI.me();

    if (apiHasError(response)) {
      console.log(response);
      return;
    }

    dispatch({ user: transformUser(response as UserDTO) });

    const responseChats = await ChatsAPI.getChats();

    if (apiHasError(responseChats)) {
      console.log(responseChats);
      return;
    }

    dispatch({ chats: responseChats });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}

export default initApp;
