import Chats from './Chats';
import Chat from '../../components/chat/Chat';
import Message from '../../components/message/message';
import ButtonSvg from '../../components/buttonSvg/ButtonSvg';
import renderDOM from '../../utils/renderDOM';
import registerComponent from '../../utils/registerComponent';

// import components from './components/**/index.js';

// // import components from './components/**/*.ts';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Chat);
  registerComponent(ButtonSvg);
  registerComponent(Message);

  const page = new Chats();

  renderDOM('#app', page);
});
