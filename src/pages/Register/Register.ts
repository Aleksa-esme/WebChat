import Block from 'utils/Component/Block';
import { validateForm, validBlurField, validFocusField } from 'utils/ValidForm';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import comparePasswords from 'utils/helpers/comparePasswords';
import { register } from 'services/auth';
import fields from './data';

interface IRegisterProps {
  onBlur?: () => void;
  onFocus?: () => void;
}

class Register extends Block {
  static componentName = 'Register';

  constructor(props: IRegisterProps) {
    super({
      ...props,
      onBlur: (event: Event) => validBlurField(event),
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      navigateLogin: () => this.props.router.go('/login'),
      onRegister: (event: Event) => this.onRegister(event),
    });
  }

  onRegister(event: Event) {
    const isError = validateForm(event);
    if (!isError) {
      const registerData = {
        email: (document.querySelector('input[name="email"]') as HTMLInputElement).value,
        login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
        first_name: (document.querySelector('input[name="first_name"]') as HTMLInputElement).value,
        second_name: (document.querySelector('input[name="second_name"]') as HTMLInputElement).value,
        phone: (document.querySelector('input[name="phone"]') as HTMLInputElement).value,
        password: (document.querySelector('input[name="password"]') as HTMLInputElement).value,
      };
      if (comparePasswords('password')) this.props.store.dispatch(register, registerData);
      else alert('Пароли должны совпадать');
    }
  }

  render() {
    return `
      <section class='login'>
        <h6 class='login__title'>Регистрация</h6>
        <form id='form' class='form'>
          <ul class='form-list'>
            ${fields.map(el => `
            <li>
              {{{ Input 
                label='${el.label}'  
                name='${el.name}' 
                type='${el.type}' 
                onBlur=onBlur
                onFocus=onFocus
                classLabel='login-form__label' 
                classInput='login-form__value' 
              }}}
            </li>`).join(' ')}
          </ul>
          <div class='form__buttons login-form__buttons login-form__buttons-register'>  
            {{{ Button 
              title='Зарегистрироваться' 
              classes='button login-form__button-register' 
              onClick=onRegister
            }}}
            {{{ Button 
              title='Войти' 
              classes='link login-form__link' 
              onClick=navigateLogin
            }}}
          </div>
        </form>
        {{#if ${!!window.store.getState().isLoading} }}
          {{{ Loader }}}
        {{/if}}
      </section>
    `;
  }
}

export default withRouter(withStore(Register));
