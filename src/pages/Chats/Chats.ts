import Block from '../../utils/Block';
import { chats, messages } from './data';

class Chats extends Block {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    console.log('готов');
  }

  render() {
    return `
      <section class="chat-page">
          <div class="chats">
              <a href="#" class="link link-small chats__link">
                  Профиль
                  <img src="../assets/svg/arrow.svg" alt="arrow">
              </a>
              <input type="text" class="chats__search" placeholder="Поиск">
              <div class="chats__list">
                  ${chats.map(el => `
                    {{{ Chat name="${el.name}" date="${el.date}" message="${el.message}" messages="${el.messages}"}}}
                  `).join(' ')}
              </div>
          </div>
          <div class="messages">
              <div class="messages-info">
                  <div class="messages-info__user">
                      <div class="messages-info__user-image">
                          <img src="https://dummyimage.com/34x34/999999" alt="user">
                      </div>
                      <p class="messages-info__user-name">Илья</p>
                  </div>
                  <img src="../assets/svg/chat-menu.svg" alt="menu">
              </div>
              <div class="messages-field">
                  <p class="messages-field__date">19 июня</p>
                  {{!-- {{#> message/message}}
                      <img src='../assets/message.jpg' alt='message'>
                  {{/message/message}} --}}
                  ${messages.map(el => `
                    {{{ Message class="${el.class}" content="${el.content}"}}}
                  `).join(' ')}
              </div>
              <form class="messages-send" id="form" action="#" >
                  {{{ ButtonSvg svg="../../../../assets/svg/file.svg" alt='add file' }}} 
                  <div class="messages-send__field">
                      <textarea name="message" type="text" class="form-field messages-send__input" placeholder="Сообщение" rows="2" wrap="soft" style="overflow:hidden"></textarea>
                      <span class="error"></span>
                  </div>
                  {{{ ButtonSvg svg="../../../../assets/svg/arrow_button.svg" alt='send' }}} 
              </form>
          </div>
      </section>
    `;
  }
}

export default Chats;
