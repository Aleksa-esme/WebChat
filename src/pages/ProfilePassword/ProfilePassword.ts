import Component from 'utils/Component/Component';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import withUser from 'utils/HOCs/withUser';
import { validBlurField, validFocusField } from 'utils/Validation/ValidForm';
import onChangePassword from 'controllers/profilePasswordController';
import * as ArrowButton from 'assets/svg/arrow_button.svg';

interface IProfilePasswordProps {
  onBlur?: () => void;
  onFocus?: () => void;
}

class ProfilePassword extends Component {
  static componentName = 'ProfilePassword';

  constructor(props: IProfilePasswordProps) {
    super({
      ...props,
      onBlur: (event: Event) => validBlurField(event, 'form'),
      onFocus: (event: Event) => validFocusField(event, 'form'),
    });

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onChangePassword: (event: Event) => onChangePassword(event),
    });
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
          onClick=navigateProfile
        }}}
        <div class='profile'>
          {{{ Avatar size='160' url='${this.props.user.avatar}' }}}
          <form id='form' class='form profile-form'>
            <ul class='form-list'>
              <li>
                {{{ Input 
                  label='Старый пароль' 
                  name='oldPassword' 
                  type='password'
                  onBlur=onBlur
                  onFocus=onFocus
                  classLabel='profile-form__label' 
                  classInput='profile-form__value' 
                }}}
              </li>
              <li>
                {{{ Input 
                  label='Новый пароль' 
                  name='newPassword' 
                  type='password'
                  onBlur=onBlur
                  onFocus=onFocus
                  classLabel='profile-form__label' 
                  classInput='profile-form__value' 
                }}}
              </li>
              <li>
                {{{ Input 
                  label='Повторите новый пароль' 
                  name='newPassword' 
                  type='password'
                  onBlur=onBlur
                  onFocus=onFocus
                  classLabel='profile-form__label' 
                  classInput='profile-form__value' 
                }}}
              </li>
            </ul>
            {{{ Button 
              title='Сохранить' 
              classes='button profile-form__button-submit' 
              onClick=onChangePassword 
            }}}
          </form>
        </div>
        {{#if ${!!window.store.getState().isLoading} }}
          {{{ Loader }}}
        {{/if}}
      </section>
    `;
  }
}

export default withRouter(withStore(withUser(ProfilePassword)));
