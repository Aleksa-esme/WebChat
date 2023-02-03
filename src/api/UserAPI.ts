import HTTPTransport from 'utils/API/HTTPTransport';

type ProfileRequestData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

type PasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

type SearchRequestData = {
  login: string;
};

export class UserAPI {
  apiInstance: HTTPTransport;

  constructor() {
    this.apiInstance = new HTTPTransport();
  }

  data(data: ProfileRequestData) {
    return this.apiInstance.put('user/profile', { data });
  }

  avatar(data: FormData) {
    return this.apiInstance.put('user/profile/avatar', { data, isFormData: true });
  }

  password(data: PasswordRequestData) {
    return this.apiInstance.put('user/password', { data });
  }

  user(id: number) {
    return this.apiInstance.get(`user/${id}`);
  }

  search(data: SearchRequestData) {
    return this.apiInstance.post('user/search', { data });
  }
}

export default new UserAPI();
