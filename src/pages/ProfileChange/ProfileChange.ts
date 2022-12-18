import Block from '../../utils/Block';
import { fields } from '../Profile/data';

class ProfileChange extends Block {
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
              <img src="../../assets/svg/arrow_button.svg" alt="back">
          </a>
          <div class="profile">
              <form id="form" action="#" method="POST" class="profile-form">
                  <div class="profile-form__photo"></div>
                  <input type="file" name="avatar" accept="image/png, image/jpeg" class="profile-form__photo__input">
                  <ul class="form-list">
                  ${fields.map(el => `
                    <li>
                      {{{ Input 
                        label="${el.label}" 
                        value="${el.value}" 
                        name="${el.name}" 
                        type="${el.type}" 
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

export default ProfileChange;
