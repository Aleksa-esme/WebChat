import Block from 'utils/block';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import * as FileSvg from 'assets/svg/file.svg';
import * as ArrowSvg from 'assets/svg/arrow.svg';
import * as MenuSvg from 'assets/svg/chat-menu.svg';
import { validateForm, validFocusField } from 'utils/ValidForm';
import { chats, messages } from './data';

interface IChatsProps {
  onSubmit?: () => void;
  onFocus?: () => void;
  onNavigate?: () => void;
}

class Chats extends Block {
  static componentName = 'Chats';

  constructor(props: IChatsProps) {
    super({
      ...props,
      onSubmit: (event: Event) => validateForm(event),
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
    });
  }

  render() {
    return `
      <section class="chat-page">
          <div class="chats">
              {{{ Button 
                title='Профиль >' 
                classes="link link-small chats__link" 
                onNavigate=navigateProfile
              }}}
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
                  ${messages.map(el => `
                    {{{ Message classes="${el.class}" content="${el.content}"}}}
                  `).join(' ')}
              </div>
              <form class="messages-send" id="form">
                  {{{ ButtonSvg svg="${FileSvg}" alt='add file' type='button' classes="svg-button" }}} 
                  {{{ MessageField onFocus=onFocus }}}
                  {{{ ButtonSvg svg="${ArrowButton}" alt='send' type='submit' classes="svg-button" onSubmit=onSubmit}}} 
              </form>
          </div>
      </section>
    `;
  }
}

export default withRouter(withStore(Chats));

// <a href="#" class="link link-small chats__link">
//     Профиль
//     <img src=${ArrowSvg} alt="arrow">
// </a>
