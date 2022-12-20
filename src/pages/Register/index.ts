import Button from 'components/button/Button';
import Input from 'components/input/Input';
import Link from 'components/link/Link';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import RegisterPage from './Register';

// import components from './components/**/index.js';

// // import components from './components/**/*.ts';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);
  registerComponent(Input);
  registerComponent(Link);

  const page = new RegisterPage();

  renderDOM('#app', page);
});
