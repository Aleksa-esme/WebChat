import Block from 'utils/block';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import logData from 'utils/logData';
import { validateForm, validBlurField, validFocusField } from 'utils/ValidForm';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';
import withUser from 'utils/withUser';
import fields from '../Profile/data';

interface IProfileChangeProps {
  onClick?: () => void;
  onSubmit?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onNavigate?: () => void;
}

class ProfileChange extends Block {
  constructor(props: IProfileChangeProps) {
    super({
      ...props,
      onClick: (event: Event) => logData(event),
      onSubmit: (event: Event) => validateForm(event),
      onBlur: (event: Event) => validBlurField(event),
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
    });
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
              <form id="form" class="form profile-form">
                  {{{ Avatar isVisible=true}}}
                  <ul class="form-list">
                  <li>
                      {{{ Input 
                        label="Почта" 
                        name="email" 
                        type="email" 
                        value='${this.props.user.email}'
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>
                    <li>
                      {{{ Input 
                        label="Логин" 
                        name="login" 
                        type="text" 
                        value="${this.props.user.login}"
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>
                    <li>
                      {{{ Input 
                        label="Имя" 
                        name="first_name" 
                        type="text" 
                        value="${this.props.user.firstName}"
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>
                    <li>
                      {{{ Input 
                        label="Фамилия" 
                        name="second_name" 
                        type="text" 
                        value="${this.props.user.secondName}"
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>
                    <li>
                      {{{ Input 
                        label="Имя в чате" 
                        name="display_name" 
                        type="text" 
                        value="${this.props.user.displayName}"
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>
                    <li>
                      {{{ Input 
                        label="Телефон" 
                        name="phone" 
                        type="telephone" 
                        value="${this.props.user.phone}"
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>
                  </ul>
                  {{{ Button 
                    title='Сохранить' 
                    classes="button profile-form__button-submit" 
                    onClick=onClick 
                    onSubmit=onSubmit 
                  }}}
              </form>
          </div>
      </section>
    `;
  }
}

export default withRouter(withStore(withUser(ProfileChange)));
