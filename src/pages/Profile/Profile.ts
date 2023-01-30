import Block from 'utils/Component/Block';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import withUser from 'utils/HOCs/withUser';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import { logout } from 'services/auth';
import { Screens } from 'utils/Router/screenList';

class Profile extends Block {
  static componentName = 'Profile';

  constructor(props: any) {
    super(props);

    this.setProps({
      navigateDataChange: () => this.props.router.go('/change'),
      navigatePasswordChange: () => this.props.router.go('/password'),
      navigateChats: () => this.props.router.go('/'),
      onLogout: () => this.props.store.dispatch(logout),
    });
  }

  componentDidUpdate() {
    // брать из HOC
    return window.store.getState().screen === Screens.ProfilePage;
  }

  render() {
    if (!this.props.user) {
      return '{{{ Loader }}}';
    }

    return `
      <section class='profile-page'>
        {{{ ButtonSvg 
          svg='${ArrowButton}' 
          alt='back' 
          type='button' 
          classes='profile-page__button-back' 
          onClick=navigateChats
        }}}
        <div class='profile'>
          {{{ Avatar size='160' url='${this.props.user.avatar}' }}}
          <form id='form' class='form profile-form'>
            <ul class='form-list'>
              <li>
                {{{ Input 
                  label='Почта' 
                  name='email' 
                  type='email' 
                  value='${this.props.user.email}'
                  classLabel='profile-form__label' 
                  classInput='profile-form__value' 
                }}}
              </li>
              <li>
                {{{ Input 
                  label='Логин' 
                  name='login' 
                  type='text' 
                  value='${this.props.user.login}'
                  classLabel='profile-form__label' 
                  classInput='profile-form__value' 
                }}}
              </li>
              <li>
                {{{ Input 
                  label='Имя' 
                  name='first_name' 
                  type='text' 
                  value='${this.props.user.firstName}'
                  classLabel='profile-form__label' 
                  classInput='profile-form__value' 
                }}}
              </li>
              <li>
                {{{ Input 
                  label='Фамилия' 
                  name='second_name' 
                  type='text' 
                  value='${this.props.user.secondName}'
                  classLabel='profile-form__label' 
                  classInput='profile-form__value' 
                }}}
              </li>
              <li>
                {{{ Input 
                  label='Имя в чате' 
                  name='display_name' 
                  type='text' 
                  value='${this.props.user.displayName}'
                  classLabel='profile-form__label' 
                  classInput='profile-form__value' 
                }}}
              </li>
              <li>
                {{{ Input 
                  label='Телефон' 
                  name='phone' 
                  type='telephone' 
                  value='${this.props.user.phone}'
                  classLabel='profile-form__label' 
                  classInput='profile-form__value' 
                }}}
              </li>
            </ul>
            <div class='form__buttons profile-form__buttons'>
                {{{ Button 
                  title='Изменить данные' 
                  classes='link profile-form__button' 
                  onClick=navigateDataChange
                }}}
                {{{ Button 
                  title='Изменить пароль' 
                  classes='link profile-form__button' 
                  onClick=navigatePasswordChange
                }}}
                {{{ Button 
                  title='Выйти' 
                  classes='link profile-form__button profile-form__button-exit' 
                  onClick=onLogout
                }}}
            </div>
          </form>
        </div>
        {{#if ${!!window.store.getState().isLoading} }}
          {{{ Loader }}}
        {{/if}}
      </section>
    `;
  }
}

export default withRouter(withStore(withUser(Profile)));
