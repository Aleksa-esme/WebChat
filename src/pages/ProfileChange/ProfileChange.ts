import Block from '../../utils/Block';
import template from './template';

class ProfileChange extends Block {
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

export default ProfileChange;
