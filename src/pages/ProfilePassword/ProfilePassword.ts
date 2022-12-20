import Block from 'utils/Block';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import logData from 'utils/logData';
import fields from './data';

class ProfilePassword extends Block {
  static componentName = 'ProfilePassword';

  constructor(props) {
    // eslint-disable-next-line no-restricted-globals
    super({ ...props, onClick: () => logData(event) });
  }

  componentDidMount() {
    console.log('готов');
  }

  render() {
    return `
      <section class="profile-page">
          <a href="#" class="profile-page__button-back">
          <img src=${ArrowButton} alt="back">
          </a>
          <div class="profile">
              <form id="form" class="profile-form">
                  <div class="profile-form__photo"></div>
                  <ul class="form-list">
                  ${fields.map(el => `
                    <li>
                      {{{ Input 
                        label="${el.label}" 
                        value="${el.value}" 
                        name="${el.name}" 
                        type="password"
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>`).join(' ')}
                  </ul>
                  {{{ Button title='Сохранить' classes="profile-form__button-submit" onClick=onClick }}}
              </form>
          </div>
      </section>
    `;
  }
}

export default ProfilePassword;
