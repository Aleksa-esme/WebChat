import Button from 'components/button/Button';
import Input from 'components/input/Input';
import renderDOM from 'utils/Component/renderDOM';
import registerComponent from 'utils/Component/registerComponent';
import { Store } from 'utils/Store';
import Router from 'utils/Router/Router';
import Register from 'pages/Register/Register';
import Profile from 'pages/Profile/Profile';
import Avatar from 'components/avatar/Avatar';
import ButtonSvg from 'components/buttonSvg/ButtonSvg';
import Chat from 'components/chat/Chat';
import Message from 'components/message/Message';
import MessageField from 'components/messageField/MessageField';
import ChatField from 'components/chatField/ChatField';
import Chats from 'pages/Chats/Chats';
import initApp from 'services/initApp';
import Login from 'pages/Login/Login';
import initRouter from './router';
import defaultState from './store/index';

declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);
  registerComponent(ButtonSvg);
  registerComponent(Input);
  registerComponent(Avatar);
  registerComponent(Chat);
  registerComponent(Input);
  registerComponent(Message);
  registerComponent(MessageField);
  registerComponent(ChatField);

  const store = new Store<AppState>(defaultState);
  const router = new Router();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;

  renderDOM(new Login({}));

  store.on('changed', (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
    }
  });

  /**
     * Инициализируем роутер
     */
  initRouter(router, store);

  /**
   * Загружаем данные для приложения
   */
  store.dispatch(initApp);
});
