import Component from 'utils/Component/Component';
import onLogin from 'controllers/loginController';
import { validBlurField, validFocusField } from 'utils/Validation/ValidForm';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import fields from './data';

interface ILoginProps {
  onBlur?: () => void;
  onFocus?: () => void;
}

class Login extends Component {
  static componentName = 'Login';

  constructor(props: ILoginProps) {
    super({
      ...props,
      onBlur: (event: Event) => validBlurField(event, 'form'),
      onFocus: (event: Event) => validFocusField(event, 'form'),
    });

    this.setProps({
      navigateRegister: () => this.props.router.go('/register'),
      onLogin: (event: Event) => onLogin(event),
    });
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
            }}}
            {{{ Button 
              title='Нет аккаунта?' 
              classes='link login-form__link' 
              onClick=navigateRegister 
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

export default withRouter(withStore(Login));
