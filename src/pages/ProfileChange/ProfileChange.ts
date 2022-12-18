import Block from '../../utils/Block';
import template from './profileChange.hbs';

class profileChangePage extends Block {
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

export default profileChangePage;
