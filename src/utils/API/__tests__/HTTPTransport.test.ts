import * as sinon from 'sinon';
import HTTPTransport from '../HTTPTransport';

describe('HTTPTransport', () => {
  it('should return get request', () => {
    const HTTP = new HTTPTransport();
    const requests: Array<sinon.SinonFakeXMLHttpRequest> = [];
    const xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request => requests.push(request));

    HTTP.get('/');
    const [request] = requests;

    expect(request.method).toEqual('GET');
  });

  it('should return post request', () => {
    const HTTP = new HTTPTransport();
    const requests: Array<sinon.SinonFakeXMLHttpRequest> = [];
    const xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request => requests.push(request));

    HTTP.post('/', {});
    const [request] = requests;

    expect(request.method).toEqual('POST');
  });

  it('should return put request', () => {
    const HTTP = new HTTPTransport();
    const requests: Array<sinon.SinonFakeXMLHttpRequest> = [];
    const xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request => requests.push(request));

    HTTP.put('/', {});
    const [request] = requests;

    expect(request.method).toEqual('PUT');
  });

  it('should return delete request', () => {
    const HTTP = new HTTPTransport();
    const requests: Array<sinon.SinonFakeXMLHttpRequest> = [];
    const xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request => requests.push(request));

    HTTP.delete('/', {});
    const [request] = requests;

    expect(request.method).toEqual('DELETE');
  });
});
