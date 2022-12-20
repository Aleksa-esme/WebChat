import Block from 'utils/Block';
import fields from './data';

class ProfilePassword extends Block {
  static componentName = 'ProfilePassword';
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    console.log('готов');
  }

  render() {
    return `
      <section class="profile-page">
          <a href="#" class="profile-page__button-back">
              <img src="../assets/svg/arrow_button.svg" alt="back">
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
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>`).join(' ')}
                  </ul>
                  {{{ Button title='Сохранить' class="profile-form__button-submit" }}}
              </form>
          </div>
      </section>
    `;
  }
}

export default ProfilePassword;
