import Block from 'utils/Component/block';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import { validateForm, validBlurField, validFocusField } from 'utils/ValidForm';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import withUser from 'utils/HOCs/withUser';
import { changeAvatar, changeData } from 'services/user';

interface IProfileChangeProps {
  onBlur?: () => void;
  onFocus?: () => void;
}

class ProfileChange extends Block {
  constructor(props: IProfileChangeProps) {
    super({
      ...props,
      onBlur: (event: Event) => validBlurField(event),
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onChangeProfile: (event: Event) => this.onChangeProfile(event),
      onChangeAvatar: (event: SubmitEvent) => this.onChangeAvatar(event),
    });
  }

  onChangeProfile(event: Event) {
    const isError = validateForm(event);
    if (!isError) {
      const profileData = {
        email: (document.querySelector('input[name="email"]') as HTMLInputElement).value,
        login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
        first_name: (document.querySelector('input[name="first_name"]') as HTMLInputElement).value,
        second_name: (document.querySelector('input[name="second_name"]') as HTMLInputElement).value,
        display_name: (document.querySelector('input[name="display_name"]') as HTMLInputElement).value,
        phone: (document.querySelector('input[name="phone"]') as HTMLInputElement).value,
      };

      this.props.store.dispatch(changeData, profileData);
    }
  }

  onChangeAvatar(event: SubmitEvent) {
    event.preventDefault();

    const avatar = document.querySelector('input[name="avatar"]');
    const curFile = avatar!.files[0];

    const form = document.getElementById('avatar_form');
    const formData = new FormData(form as HTMLFormElement);
    if (!!curFile && curFile.size <= 1048576) this.props.store.dispatch(changeAvatar, formData);
    else if (!!curFile && curFile.size > 1048576) alert('Размер файла не должен превышать 1МБ');
    else alert('Файл не выбран');
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
