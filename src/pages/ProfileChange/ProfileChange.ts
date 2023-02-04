import Component from 'utils/Component/Component';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import { onChangeProfile, onChangeAvatar } from 'controllers/profileChangeController';
import { validBlurField, validFocusField } from 'utils/Validation/ValidForm';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import withUser from 'utils/HOCs/withUser';

interface IProfileChangeProps {
  onBlur?: () => void;
  onFocus?: () => void;
}

class ProfileChange extends Component {
  constructor(props: IProfileChangeProps) {
    super({
      ...props,
      onBlur: (event: Event) => validBlurField(event),
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onChangeProfile: (event: Event) => onChangeProfile(event),
      onChangeAvatar: (event: SubmitEvent) => onChangeAvatar(event),
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
          {{{ AvatarForm 
            form_id='avatar_form' 
            size='160'
            url='${this.props.user.avatar}'
            onSubmit=onChangeAvatar  
          }}}
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
                  onBlur=onBlur
                  onFocus=onFocus
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
                  onBlur=onBlur
                  onFocus=onFocus
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
                  onBlur=onBlur
                  onFocus=onFocus
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
                  onBlur=onBlur
                  onFocus=onFocus
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
                  onBlur=onBlur
                  onFocus=onFocus
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
                  onBlur=onBlur
                  onFocus=onFocus
                }}}
              </li>
            </ul>
            {{{ Button 
              title='Сохранить' 
              classes='button profile-form__button-submit' 
              onClick=onChangeProfile 
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

export default withRouter(withStore(withUser(ProfileChange)));
