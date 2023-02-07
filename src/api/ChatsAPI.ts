import HTTPTransport from 'utils/API/HTTPTransport';

type CreateChatRequestData = {
  title: string;
};

type DeleteChatRequestData = {
  chatId: number;
};

type UserRequestData = {
  users: Array<number>,
  chatId: string
};

export class ChatsAPI {
  apiInstance: HTTPTransport;

  constructor() {
    this.apiInstance = new HTTPTransport();
  }

  getChats(offset = 0, limit = 100, title = '') {
    return this.apiInstance.get('chats', {
      data: { offset, limit, title },
    });
  }

  create(data: CreateChatRequestData) {
    return this.apiInstance.post('chats', { data });
  }

  delete(data: DeleteChatRequestData) {
    return this.apiInstance.delete('chats', { data });
  }

  avatar(data: FormData) {
    return this.apiInstance.put('chats/avatar', { data, isFormData: true });
  }

  addUser(data: UserRequestData) {
    return this.apiInstance.put('chats/users', { data });
  }

  getChatUsers(id: string) {
    return this.apiInstance.get(`chats/${id}/users`);
  }

  getToken(chatId: string) {
    return this.apiInstance.post(`chats/token/${chatId}`);
  }

  deleteUser(data: UserRequestData) {
    return this.apiInstance.delete('chats/users', { data });
  }
}

export default new ChatsAPI();
