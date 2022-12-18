import Block from '../../utils/Block';
import template from './Error404.hbs';

class Error404 extends Block {
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

export default Error404;
