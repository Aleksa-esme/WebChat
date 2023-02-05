import Component from 'utils/Component/Component';

interface IInputProps {
  label: String;
  name: String;
  value: String;
  type: String;
  isDisabled?: Boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  classLabel: String;
  classInput: String;
}

class Input extends Component {
  static componentName = 'Input';

  constructor({
    label, name, value, type, classInput, classLabel, isDisabled = false, onBlur, onFocus,
  }: IInputProps) {
    super({
      label,
      name,
      value,
      type,
      isDisabled,
      classInput,
      classLabel,
      events: {
        focusout: onBlur,
        focusin: onFocus,
      },
    });

    this.setProps({
      value: this.checkNull(value),
    });
  }

  checkNull(value: String): String {
    if (value === 'null') value = '';
    return value;
  }

  render() {
    return `
      <label class='form__label {{ classLabel }}'>
          {{ label }}
          {{#if ${this.props.isDisabled} }}
            <input 
              name={{ name }} 
              value='{{ value }}' 
              class='input form__value {{ classInput }}' 
              type={{ type }}
              disabled
            >
          {{else}}
            <input 
              name={{ name }} 
              value='{{ value }}' 
              class='input form__value {{ classInput }}' 
              type={{ type }}
            >
          {{/if}}
          <span class='error'></span>
      </label>
    `;
  }
}

export default Input;
