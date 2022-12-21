import Block from 'utils/block';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import logData from 'utils/logData';
import { fields } from '../Profile/data';

interface IProfileChangeProps {
  onClick?: () => void;
}

class ProfileChange extends Block {
  constructor(props: IProfileChangeProps) {
    super({ ...props, onClick: (event: Event) => logData(event) });
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
                  {{{ Button title='Сохранить' classes="profile-form__button-submit" onClick=onClick }}}
              </form>
          </div>
      </section>
    `;
  }
}

export default ProfileChange;
