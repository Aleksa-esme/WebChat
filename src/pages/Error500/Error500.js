import Block from '../../utils/block';
import template from './Error500.hbs';

class Error500 extends Block {
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

export default Error500;
