import Block from 'utils/Component/block';
import logData from 'utils/logData';
import { validateForm, validBlurField, validFocusField } from 'utils/ValidForm';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import { login } from 'services/auth';
import fields from './data';

interface ILoginProps {
  onClick?: () => void;
  onSubmit?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onNavigate?: () => void;
}

class Login extends Block {
  static componentName = 'Login';

  constructor(props: ILoginProps) {
    super({
      ...props,
      // onClick: (event: Event) => logData(event),
      onSubmit: (event: Event) => validateForm(event),
      onBlur: (event: Event) => validBlurField(event),
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      navigateRegister: () => this.props.router.go('/register'),
      onLogin: () => this.onLogin(),
    });
  }

  onLogin() {
    const loginData = {
      login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
      password: (document.querySelector('input[name="password"]') as HTMLInputElement).value,
    };
    this.props.store.dispatch(login, loginData);
  }

  render() {
    return `
      <section class='login'>
        <h6 class='login__title'>Вход</h6>
        <form id='form' class='form' >
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
          <div class='form__buttons login-form__buttons login-form__buttons-login'>
            {{{ Button 
              title='Войти' 
              classes='button login-form__button-login' 
              onClick=onLogin 
              onSubmit=onSubmit 
            }}}
            {{{ Button 
              title='Нет аккаунта?' 
              classes='link login-form__link' 
              onNavigate=navigateRegister 
            }}}
          </div>
        </form>
      </section>
    `;
  }
}

export default withRouter(withStore(Login));
