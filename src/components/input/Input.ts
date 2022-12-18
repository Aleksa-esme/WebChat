import Block from '../../utils/Block';
import template from './input.hbs';

interface IInputProps {
  label: String;
  name: String;
  value: String;
  type: String;
  classLabel: String;
  classInput: String;
}

class Input extends Block {
  constructor(props: IInputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Input;
