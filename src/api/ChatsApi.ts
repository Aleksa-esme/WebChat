import HTTPTransport from 'utils/API/HTTPTransport';

type CreateChatRequestData = {
  title: string;
};

type DeleteChatRequestData = {
  chatId: string;
};

type AddUserRequestData = {
  users: Array<number>,
  chatId: string
};

export class ChatsAPI {
  apiInstance: HTTPTransport;

  constructor() {
    this.apiInstance = new HTTPTransport();
  }

  getChats() {
    return this.apiInstance.get('chats');
  }

  create(data: CreateChatRequestData) {
    return this.apiInstance.post('chats', { data });
  }

  delete(data: DeleteChatRequestData) {
    return this.apiInstance.delete('chats', { data });
  }

  addUser(data: AddUserRequestData) {
    return this.apiInstance.put('chats/users', { data });
  }

  getChatUsers(id: string) {
    return this.apiInstance.get(`chats/${id}/users`);
  }

  getChatUsersToken(chatId: string) {
    return this.apiInstance.post(`chats/token/${chatId}`);
  }
}

export default new ChatsAPI();
