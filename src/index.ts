// Components
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import Avatar from 'components/avatar/Avatar';
import AvatarForm from 'components/avatarForm/AvatarForm';
import ButtonSvg from 'components/buttonSvg/ButtonSvg';
import Loader from 'components/loader/Loader';
import Chat from 'components/ChatPage/chat/Chat';
import Message from 'components/ChatPage/message/Message';
import MessageField from 'components/ChatPage/messageField/MessageField';
import ChatField from 'components/ChatPage/chatField/ChatField';
import MessageForm from 'components/ChatPage/messageForm/MessageForm';
import MessagesList from 'components/ChatPage/messagesList/MessagesList';
import ChatMenu from 'components/ChatPage/chatMenu/ChatMenu';
import ChatInfo from 'components/ChatPage/chatInfo/ChatInfo';
// Pages
import Chats from 'pages/Chats/Chats';
// Utils
import renderDOM from 'utils/Component/renderDOM';
import registerComponent from 'utils/Component/registerComponent';
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
  registerComponent(AvatarForm);
  registerComponent(Chat);
  registerComponent(ChatField);
  registerComponent(ChatMenu);
  registerComponent(ChatInfo);
  registerComponent(Message);
  registerComponent(MessageField);
  registerComponent(MessageForm);
  registerComponent(MessagesList);

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
