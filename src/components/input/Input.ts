import Block from '../../utils/Block';

interface IInputProps {
  label: String;
  name: String;
  value: String;
  type: String;
  classLabel: String;
  classInput: String;
}

class Input extends Block {
  static componentName = 'Input';

  constructor(props: IInputProps) {
    super(props);
  }

  render() {
    return `
      <label class={{ classLabel }}>
          {{ label }}
          <input name={{ name }} value={{ value }} class='input form-field {{ classInput }}' type={{ type }}>
          <span class="error"></span>
      </label>
    `;
  }
}

export default Input;
