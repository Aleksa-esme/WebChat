import Block from '../../utils/Block';
import template from './template';

class Login extends Block {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    console.log('готов');
  }

  render() {
    return template;
  }
}

export default Login;
