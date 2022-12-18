import Block from '../../utils/Block';
import template from './template';

class Register extends Block {
  constructor(props) {
    super({ ...props });
  }

  componentDidMount() {
    console.log('готов');
  }

  render() {
    return template;
  }
}

export default Register;
