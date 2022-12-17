import Block from '../../utils/block';
import template from './Chats.hbs';

class Chats extends Block {
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

export default Chats;
