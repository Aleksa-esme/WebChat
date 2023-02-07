import HTTPTransport from 'utils/API/HTTPTransport';

export class StickersAPI {
  apiInstance: HTTPTransport;

  constructor() {
    this.apiInstance = new HTTPTransport();
  }

  getPack() {
    return this.apiInstance.get('stickers');
  }

  createPack(data: FormData) {
    return this.apiInstance.post('stickers', { data, isFormData: true });
  }
}

export default new StickersAPI();
