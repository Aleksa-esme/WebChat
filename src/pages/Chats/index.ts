import Chat from 'components/chat/Chat';
import Message from 'components/message/Message';
import ButtonSvg from 'components/buttonSvg/ButtonSvg';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import Chats from './Chats';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Chat);
  registerComponent(ButtonSvg);
  registerComponent(Message);

  const page = new Chats({});

  renderDOM('#app', page);
});
