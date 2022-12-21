import Input from 'components/input/Input';
import Link from 'components/link/Link';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import ProfilePage from './Profile';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Input);
  registerComponent(Link);

  const page = new ProfilePage({});

  renderDOM('#app', page);
});
