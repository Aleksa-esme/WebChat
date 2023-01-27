import Block from 'utils/Component/block';

interface IInputProps {
  label: String;
  name: String;
  value: String;
  type: String;
  onBlur?: () => void;
  onFocus?: () => void;
  classLabel: String;
  classInput: String;
}

class Input extends Block {
  static componentName = 'Input';

  constructor({
    label, name, value, type, classInput, classLabel, onBlur, onFocus,
  }: IInputProps) {
    super({
      label,
      name,
      value,
      type,
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
    console.log('%c Input render', 'background: #5f5af3; color: #fff');
    return `
      <label class='form__label {{ classLabel }}'>
          {{ label }}
          <input 
            name={{ name }} 
            value='{{ value }}' 
            class='input form__value {{ classInput }}' 
            type={{ type }}
          >
          <span class='error'></span>
      </label>
    `;
  }
}

export default Input;
