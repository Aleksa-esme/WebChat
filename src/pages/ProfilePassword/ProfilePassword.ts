import Block from 'utils/Component/block';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import withUser from 'utils/HOCs/withUser';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import logData from 'utils/logData';
import { validateForm, validBlurField, validFocusField } from 'utils/ValidForm';
import { changePassword } from 'services/user';

interface IProfilePasswordProps {
  onClick?: () => void;
  onSubmit?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onNavigate?: () => void;
}

class ProfilePassword extends Block {
  static componentName = 'ProfilePassword';

  constructor(props: IProfilePasswordProps) {
    super({
      ...props,
      // onClick: (event: Event) => logData(event),
      onSubmit: (event: Event) => validateForm(event),
      onBlur: (event: Event) => validBlurField(event),
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onChangePassword: () => this.onChangePassword(),
    });
  }

  onChangePassword() {
    const passwordData = {
      oldPassword: (document.querySelector('input[name="oldPassword"]') as HTMLInputElement).value,
      newPassword: (document.querySelector('input[name="newPassword"]') as HTMLInputElement).value,
    };

    this.props.store.dispatch(changePassword, passwordData);
  }

  render() {
    if (!this.props.user) {
      return 'no authorized user';
    }

    return `
      <section class="profile-page">
      {{{ ButtonSvg 
        svg="${ArrowButton}" 
        alt='back' 
        type='button' 
        classes="profile-page__button-back" 
        onNavigate=navigateProfile
      }}}
          <div class="profile">
            {{{ Avatar url='${this.props.user.avatar}' }}}
              <form id="form" class="form profile-form">
                  <ul class="form-list">
                    <li>
                      {{{ Input 
                        label="Старый пароль" 
                        name="oldPassword" 
                        type="password"
                        onBlur=onBlur
                        onFocus=onFocus
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>
                    <li>
                      {{{ Input 
                        label="Новый пароль" 
                        name="newPassword" 
                        type="password"
                        onBlur=onBlur
                        onFocus=onFocus
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>
                    <li>
                      {{{ Input 
                        label="Повторите новый пароль" 
                        name="newPassword" 
                        type="password"
                        onBlur=onBlur
                        onFocus=onFocus
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>
                  </ul>
                  {{{ Button 
                    title='Сохранить' 
                    classes="button profile-form__button-submit" 
                    onClick=onChangePassword 
                    onSubmit=onSubmit 
                  }}}
              </form>
          </div>
      </section>
    `;
  }
}

export default withRouter(withStore(withUser(ProfilePassword)));
