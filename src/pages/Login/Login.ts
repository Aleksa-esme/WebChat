import Block from '../../utils/Block';
import template from './login.hbs';

class LoginPage extends Block {
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

export default LoginPage;
