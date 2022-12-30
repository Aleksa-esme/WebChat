import Avatar from 'components/avatar/Avatar';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import ProfileChangePage from './ProfileChange';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Avatar);
  registerComponent(Button);
  registerComponent(Input);

  const page = new ProfileChangePage({});

  renderDOM('#app', page);
});
