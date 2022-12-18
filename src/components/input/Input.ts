import Block from '../../utils/Block';
import template from './template';

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
    return template;
  }
}

export default Input;
