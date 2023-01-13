import Block from 'utils/block';
import logData from 'utils/logData';
import { validateForm, validBlurField, validFocusField } from 'utils/ValidForm';
import Router from 'utils/Router';
import { Store } from 'utils/Store';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';
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
      navigateAfterRegister: () => this.navigateAfterRegister(),
    });
  }

  navigateAfterRegister() {
    if (this.props.store.getState().user) {
      this.props.router.go('/profile');
    } else {
      this.props.router.go('/login');
    }
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
                    value="${el.value}" 
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
                    onClick=onClick
                    onSubmit=onSubmit 
                    onNavigate=onNavigate
                  }}}
                  {{{ Button 
                    title='Войти' 
                    classes="link login-form__link" 
                  }}}
              </div>
          </form>
      </section>
    `;
  }
}

export default withRouter(withStore(Register));
