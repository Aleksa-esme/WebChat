import Block from 'utils/block';
import logData from 'utils/logData';
import fields from './data';

interface ILoginProps {
  onClick?: () => void;
}

class Login extends Block {
  static componentName = 'Login';

  constructor(props: ILoginProps) {
    super({ ...props, onClick: () => logData(event) });
  }

  render() {
    return `
    <section class="login">
      <h6 class="login__title">Вход</h6>
      <form id="form" class="login-form" >
          <ul class="form-list">
              ${fields.map(el => `
                    <li>
                      {{{ Input 
                        label="${el.label}" 
                        value="${el.value}" 
                        name="${el.name}" 
                        type="${el.type}" 
                        classLabel='login-form__label' 
                        classInput='login-form__value' 
                      }}}
                    </li>`).join(' ')}
          </ul>
          <div class="login-form__buttons login-form__buttons-login">
              {{{ Button title='Войти' classes="login-form__button-login" onClick=onClick }}}
              {{{ Link title='Нет аккаунта?' classes="login-form__link" }}}
          </div>
      </form>
    </section>
    `;
  }
}

export default Login;
