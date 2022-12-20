import Block from 'utils/Block';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import { fields, links } from './data';

class Profile extends Block {
  static componentName = 'Profile';

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
                        type="${el.type}" 
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>`).join(' ')}
                  </ul>
                  <div class="profile-form__buttons">
                  ${links.map(el => `
                    {{{ Link title="${el.title}" classes="${el.class}"}}}
                  `).join(' ')}
                  </div>
              </form>
          </div>
      </section>
    `;
  }
}

export default Profile;
