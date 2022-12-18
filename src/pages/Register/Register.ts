import Block from '../../utils/Block';
import template from './register.hbs';

class RegisterPage extends Block {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    console.log('готов');
  }

  render() {
    return this.compile(template, {});
  }
}

export default RegisterPage;
