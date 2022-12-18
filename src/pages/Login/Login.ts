import Block from '../../utils/Block';
import fields from './data';

class Login extends Block {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    console.log('готов');
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
              {{{ Button title='Войти' class="login-form__button-login" }}}
              {{{ Link title='Нет аккаунта?' class="login-form__link"}}}
          </div>
      </form>
    </section>
    `;
  }
}

export default Login;
