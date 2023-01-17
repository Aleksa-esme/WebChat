import Block from 'utils/Component/block';
import logData from 'utils/logData';
import { validateForm, validBlurField, validFocusField } from 'utils/ValidForm';
import Router from 'utils/Router/Router';
import { Store } from 'utils/Store';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import { register } from 'services/auth';
import fields from './data';

interface IRegisterProps {
  onClick?: () => void;
  onSubmit?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  // router: Router;
  // store: Store<AppState>;
  // isLoading: boolean;
  // onToggleAppLoading?: () => void;
  onNavigate?: () => void;
}

class Register extends Block {
  static componentName = 'Register';

  constructor(props: IRegisterProps) {
    super({
      ...props,
      onClick: (event: Event) => logData(event),
      onSubmit: (event: Event) => validateForm(event),
      onBlur: (event: Event) => validBlurField(event),
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      // onToggleAppLoading: () => this.onToggleAppLoading(),
      // navigateAfterRegister: () => this.navigateAfterRegister(),
      navigateLogin: () => this.props.router.go('/login'),
      onRegister: () => this.onRegister(),
    });
  }

  // navigateAfterRegister() {
  //   if (this.props.store.getState().user) {
  //     this.props.router.go('/profile');
  //   } else {
  //     this.props.router.go('/login');
  //   }
  // }

  onRegister() {
    const registerData = {
      email: (document.querySelector('input[name="email"]') as HTMLInputElement).value,
      login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
      first_name: (document.querySelector('input[name="first_name"]') as HTMLInputElement).value,
      second_name: (document.querySelector('input[name="second_name"]') as HTMLInputElement).value,
      phone: (document.querySelector('input[name="phone"]') as HTMLInputElement).value,
      password: (document.querySelector('input[name="password"]') as HTMLInputElement).value,
    };
    console.log(registerData);
    this.props.store.dispatch(register, registerData);
  }

  // onToggleAppLoading() {
  //   this.props.store.dispatch({ isLoading: true });

  //   setTimeout(() => {
  //     this.props.store.dispatch({ isLoading: false });
  //   }, 2000);
  // }

  render() {
    return `
      <section class="login">
          <h6 class="login__title">Регистрация</h6>
          <form id="form" class="form">
              <ul class="form-list">
              ${fields.map(el => `
                <li>
                  {{{ Input 
                    label="${el.label}"  
                    name="${el.name}" 
                    type="${el.type}" 
                    onBlur=onBlur
                    onFocus=onFocus
                    classLabel='login-form__label' 
                    classInput='login-form__value' 
                  }}}
                </li>`).join(' ')}
              </ul>
              <div class="form__buttons login-form__buttons login-form__buttons-register">  
                  {{{ Button 
                    title='Зарегистрироваться' 
                    classes="button login-form__button-register" 
                    onClick=onRegister
                    onSubmit=onSubmit 
                    onNavigate=onNavigate
                  }}}
                  {{{ Button 
                    title='Войти' 
                    classes="link login-form__link" 
                    onNavigate=navigateLogin
                  }}}
              </div>
          </form>
      </section>
    `;
  }
}

export default withRouter(withStore(Register));
