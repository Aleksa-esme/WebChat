import { WSTransport, EVENTS } from 'utils/API/WSTransport';

class Messages {
  private socket: WSTransport;

  private sockets: { [id: string]: WSTransport } = {};

  public async connect(chatId: number, token: string, start: string): Promise<void> {
    this.close();

    const userId = window.store.getState().user!.id;

    this.socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    await this.socket.connect();

    this.sockets[chatId] = this.socket;

    this.socket.on(EVENTS.MESSAGE, message => this.storeMessages(message));

    this.socket.on(EVENTS.CLOSE, () => {
      this.close();
    });

    this.socket.send({ type: 'get old', content: start || '0' });
  }

  public sendMessage(content: string): void {
    this.socket.send({
      content,
      type: 'message',
    });
  }

  private async storeMessages(messages: Object | Array<Object>): Promise<void> {
    let newMessages: Array<Object> = [];

    if (Array.isArray(messages)) newMessages = messages.reverse();
    else newMessages.push(messages);

    const currentMessages = window.store.getState().messages;

    currentMessages.push(newMessages);

    window.store.dispatch({ messages: currentMessages.flat() });
  }

  public close(): void {
    const sockets = Object.keys(this.sockets);

    if (sockets.length) {
      sockets.forEach((id: string) => {
        this.sockets[id].close();

        delete this.sockets[id];

        window.store.dispatch({ messages: [] });
      });
    }
  }
}

export default new Messages();
