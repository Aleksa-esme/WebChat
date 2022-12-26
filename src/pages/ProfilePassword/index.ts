import Button from 'components/button/Button';
import Input from 'components/input/Input';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import ProfilePasswordPage from './ProfilePassword';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);
  registerComponent(Input);

  const page = new ProfilePasswordPage({});

  renderDOM('#app', page);
});
