import HTTPTransport from 'utils/API/HTTPTransport';

type LoginRequestData = {
  login: string;
  password: string;
};

type RegisterRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export class AuthAPI {
  apiInstance: HTTPTransport;

  constructor() {
    this.apiInstance = new HTTPTransport();
  }

  login(data: LoginRequestData) {
    return this.apiInstance.post('auth/signin', { data });
  }

  register(data: RegisterRequestData) {
    return this.apiInstance.post('auth/signup', { data });
  }

  me() {
    return this.apiInstance.get('auth/user');
  }

  logout() {
    return this.apiInstance.post('auth/logout');
  }
}

export default new AuthAPI();
