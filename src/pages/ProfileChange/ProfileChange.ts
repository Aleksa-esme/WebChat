import Block from 'utils/block';
import * as ArrowButton from 'assets/svg/arrow_button.svg';
import logData from 'utils/logData';
import { validateForm, validBlurField, validFocusField } from 'utils/ValidForm';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';
import fields from '../Profile/data';

interface IProfileChangeProps {
  onClick?: () => void;
  onSubmit?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onNavigate?: () => void;
}

class ProfileChange extends Block {
  constructor(props: IProfileChangeProps) {
    super({
      ...props,
      onClick: (event: Event) => logData(event),
      onSubmit: (event: Event) => validateForm(event),
      onBlur: (event: Event) => validBlurField(event),
      onFocus: (event: Event) => validFocusField(event),
    });

    this.setProps({
      navigateProfile: () => this.props.router.go('/profile'),
    });
  }

  render() {
    return `
      <section class="profile-page">
      {{{ ButtonSvg 
        svg="${ArrowButton}" 
        alt='back' 
        type='button' 
        classes="profile-page__button-back" 
        onNavigate=navigateProfile
      }}}
          <div class="profile">
              <form id="form" class="form profile-form">
                  {{{ Avatar isVisible=true}}}
                  <ul class="form-list">
                  ${fields.map(el => `
                    <li>
                      {{{ Input 
                        label="${el.label}" 
                        value="${el.value}" 
                        name="${el.name}" 
                        type="${el.type}" 
                        onBlur=onBlur
                        onFocus=onFocus
                        classLabel='profile-form__label' 
                        classInput='profile-form__value' 
                      }}}
                    </li>`).join(' ')}
                  </ul>
                  {{{ Button 
                    title='Сохранить' 
                    classes="button profile-form__button-submit" 
                    onClick=onClick 
                    onSubmit=onSubmit 
                  }}}
              </form>
          </div>
      </section>
    `;
  }
}

export default withRouter(withStore(ProfileChange));
