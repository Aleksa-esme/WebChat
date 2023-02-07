import Component from 'utils/Component/Component';
import { validBlurField, validFocusField } from 'utils/Validation/ValidForm';
import onRegister from 'controllers/registerController';
import withRouter from 'utils/HOCs/withRouter';
import withStore from 'utils/HOCs/withStore';
import fields from './data';

interface IRegisterProps {
  onBlur?: () => void;
  onFocus?: () => void;
}

class Register extends Component {
  static componentName = 'Register';

  constructor(props: IRegisterProps) {
    super({
      ...props,
      onBlur: (event: Event) => validBlurField(event, 'form'),
      onFocus: (event: Event) => validFocusField(event, 'form'),
    });

    this.setProps({
      navigateLogin: () => this.props.router.go('/login'),
      onRegister: (event: Event) => onRegister(event),
    });
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
