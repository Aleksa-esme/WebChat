import Block from '../../utils/block';
import template from './profile.hbs';

class ProfilePage extends Block {
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

export default ProfilePage;
