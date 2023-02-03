import HTTPTransport from 'utils/API/HTTPTransport';

export class ResourcesAPI {
  apiInstance: HTTPTransport;

  constructor() {
    this.apiInstance = new HTTPTransport();
  }

  send(data: FormData) {
    return this.apiInstance.post('resources', { data, isFormData: true });
  }

  get(path: string) {
    return this.apiInstance.get(`resources/${path}`);
  }
}

export default new ResourcesAPI();
