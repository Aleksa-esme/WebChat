import Block from '../../utils/Block';
import template from './template';

class Error500 extends Block {
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

export default Error500;
