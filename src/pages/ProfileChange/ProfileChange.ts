import Block from 'utils/Component/block';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import logData from 'utils/logData';
import { validateForm, validBlurField, validFocusField } from 'utils/ValidForm';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import withUser from 'utils/HOCs/withUser';
import { changeAvatar, changeData } from 'services/user';

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
      // onClick: (event: Event) => logData(event),
      onSubmit: (event: Event) => validateForm(event),
      onBlur: (event: Event) => validBlurField(event),
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
      onChangeProfile: () => this.onChangeProfile(),
      onChangeAvatar: () => this.onChangeAvatar(),
      url: () => this.props.user.avatar,
    });
  }

  onChangeProfile() {
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

  onChangeAvatar() {
  //   const avatar = document.querySelector('input[name="avatar"]');
  //   const curFiles = avatar!.files[0];
  //   console.log(curFiles);
  //   console.log(avatar);
  //   console.log('форма');
  //   const form = document.getElementById('avatar_form');
  //   const formData = new FormData(form as HTMLFormElement);
  //   this.props.store.dispatch(changeData, formData);
    const form = document.getElementById('avatar_form');
    const formData = new FormData(form as HTMLFormElement);
    console.log(formData)
    this.props.store.dispatch(changeAvatar, formData);
    // console.log(this.props.user.avatar)
    // this.setProps({
    //   url: () => this.props.user.avatar,
    // })
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
              {{{ Avatar 
                form_id="avatar_form" 
                isVisible=true url=url
                onSubmit=onChangeAvatar  
              }}}
              <form id="form" class="form profile-form">
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
                    onClick=onChangeProfile 
                    onSubmit=onSubmit 
                  }}}
              </form>
          </div>
      </section>
    `;
  }
}

export default withRouter(withStore(withUser(ProfileChange)));
