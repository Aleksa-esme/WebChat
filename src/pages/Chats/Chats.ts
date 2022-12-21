import Block from 'utils/Block';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import * as FileSvg from 'assets/svg/file.svg';
import * as ArrowSvg from 'assets/svg/arrow.svg';
import * as MenuSvg from 'assets/svg/chat-menu.svg';
import { chats, messages } from './data';

class Chats extends Block {
  static componentName = 'Chats';

  render() {
    return `
      <section class="chat-page">
          <div class="chats">
              <a href="#" class="link link-small chats__link">
                  Профиль
                  <img src=${ArrowSvg} alt="arrow">
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
                  <img src=${MenuSvg} alt="menu">
              </div>
              <div class="messages-field">
                  <p class="messages-field__date">19 июня</p>
                  {{!-- {{#> message/message}}
                      <img src='../assets/message.jpg' alt='message'>
                  {{/message/message}} --}}
                  ${messages.map(el => `
                    {{{ Message classes="${el.class}" content="${el.content}"}}}
                  `).join(' ')}
              </div>
              <form class="messages-send" id="form">
                  {{{ ButtonSvg svg="${FileSvg}" alt='add file' type='button' }}} 
                  <div class="messages-send__field">
                    <textarea name="message" type="text" class="form-field messages-send__input" placeholder="Сообщение" rows="2" wrap="soft" style="overflow:hidden"></textarea>
                    <span class="error"></span>
                  </div>
                  {{{ ButtonSvg svg="${ArrowButton}" alt='send' type='submit' }}} 
              </form>
          </div>
      </section>
    `;
  }
}

export default Chats;
