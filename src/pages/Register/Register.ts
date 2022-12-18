import Block from '../../utils/Block';
import fields from './data';

class Register extends Block {
  constructor(props) {
    super({ ...props });
  }

  componentDidMount() {
    console.log('готов');
  }

  render() {
    return `
      <section class="login">
          <h6 class="login__title">Регистрация</h6>
          <form id="form" action="#" class="login-form" method="POST">
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
                  {{{ Button title='Зарегистрироваться' class="login-form__button-register" }}}
                  {{{ Link title='Войти' class="login-form__link"}}}
              </div>
          </form>
      </section>
    `;
  }
}

export default Register;
