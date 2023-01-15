import HTTPTransport from 'utils/HTTPTransport';
import BaseAPI from './BaseAPI';

const authAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI extends BaseAPI {
  getUser() {
    return authAPIInstance.get('/user');
  }

  signup(data) {
    return authAPIInstance.post('/signup', { data });
  }

  signin(data) {
    return authAPIInstance.post('/signin', { data });
  }

  logout() {
    return authAPIInstance.post('/logout');
  }
}

export default ChatAPI;
