import Chat from 'components/chat/Chat';
import Message from 'components/message/Message';
import MessageField from 'components/messageField/MessageField';
import ButtonSvg from 'components/buttonSvg/ButtonSvg';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import Chats from './Chats';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Chat);
  registerComponent(MessageField);
  registerComponent(ButtonSvg);
  registerComponent(Message);

  const page = new Chats({});

  renderDOM('#app', page);
});
