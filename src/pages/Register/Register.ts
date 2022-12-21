import Block from 'utils/block';
import logData from 'utils/logData';
import fields from './data';

interface IRagisterProps {
  onClick?: () => void;
}

class Register extends Block {
  static componentName = 'Register';

  constructor(props: IRagisterProps) {
    super({ ...props, onClick: () => logData(event) });
  }

  render() {
    return `
      <section class="login">
          <h6 class="login__title">Регистрация</h6>
          <form id="form" class="login-form">
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
              <div class="login-form__buttons login-form__buttons-register">  
                  {{{ Button title='Зарегистрироваться' classes="login-form__button-register" onClick=onClick }}}
                  {{{ Link title='Войти' classes="login-form__link" }}}
              </div>
          </form>
      </section>
    `;
  }
}

export default Register;