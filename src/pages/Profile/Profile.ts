import Block from 'utils/block';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import { logout } from 'services/auth';
import fields from './data';

interface IProfileProps {
  onNavigate?: () => void;
}

class Profile extends Block {
  static componentName = 'Profile';

  constructor(props: IProfileProps) {
    super(props);

    this.setProps({
      navigateDataChange: () => this.props.router.go('/change'),
      navigatePasswordChange: () => this.props.router.go('/password'),
      navigateLogin: () => this.props.router.go('/login'),
      navigateChats: () => this.props.router.go('/chats'),
      onLogout: () => this.props.store.dispatch(logout),
    });
  }

  render() {
    return `
      <section class="profile-page">
          {{{ ButtonSvg 
            svg="${ArrowButton}" 
            alt='back' 
            type='button' 
            classes="profile-page__button-back" 
            onNavigate=navigateChats
          }}}
          <div class="profile">
              <form id="form" class="form profile-form">
                {{{ Avatar }}}
                  <ul class="form-list">
                  ${fields.map(el => `
                    <li>
                      {{{ Input 
                        label="${el.label}" 
                        name="${el.name}" 
                        type="${el.type}" 
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>`).join(' ')}
                  </ul>
                  <div class="form__buttons profile-form__buttons">
                    {{{ Button 
                      title='Изменить данные' 
                      classes="link profile-form__button" 
                      onNavigate=navigateDataChange
                    }}}
                    {{{ Button 
                      title='Изменить пароль' 
                      classes="link profile-form__button" 
                      onNavigate=navigatePasswordChange
                    }}}
                    {{{ Button 
                      title='Выйти' 
                      classes="link profile-form__button profile-form__button-exit" 
                      onNavigate=navigateLogin
                      onClick=onLogout
                    }}}
                  </div>
              </form>
          </div>
      </section>
    `;
  }
}

export default withRouter(withStore(Profile));
