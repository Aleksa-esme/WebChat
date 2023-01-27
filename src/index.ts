import Button from 'components/button/Button';
import Input from 'components/input/Input';
import Avatar from 'components/avatar/Avatar';
import ButtonSvg from 'components/buttonSvg/ButtonSvg';
import Chat from 'components/chat/Chat';
import Message from 'components/message/Message';
import MessageField from 'components/messageField/MessageField';
import ChatField from 'components/chatField/ChatField';
import MessageForm from 'components/messageForm/MessageForm';
import Loader from 'components/loader/Loader';
import renderDOM from 'utils/Component/renderDOM';
import registerComponent from 'utils/Component/registerComponent';
import Chats from 'pages/Chats/Chats';
import { Store, StoreEvents } from 'utils/Store';
import Router from 'utils/Router/Router';
import initApp from 'services/initApp';
import initRouter from './router';
import defaultState from './store/index';

declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Loader);
  registerComponent(Button);
  registerComponent(ButtonSvg);
  registerComponent(Input);
  registerComponent(Avatar);
  registerComponent(Chat);
  registerComponent(Input);
  registerComponent(Message);
  registerComponent(MessageField);
  registerComponent(ChatField);
  registerComponent(MessageForm);

  const store = new Store<AppState>(defaultState);
  const router = new Router();

  window.router = router;
  window.store = store;

  renderDOM(new Chats({}));

  store.on(StoreEvents.UPDATED, (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
    }
  });

  /**
  * Загружаем данные для приложения
  */
  store.dispatch(initApp);

  /**
  * Инициализируем роутер
  */
  initRouter(router, store);
});
