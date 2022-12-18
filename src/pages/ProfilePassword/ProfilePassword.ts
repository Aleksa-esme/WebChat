import Block from '../../utils/Block';
import template from './profilePassword.hbs';

class profilePasswordPage extends Block {
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

export default profilePasswordPage;
