import RegisterPage from './register';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Link from '../../components/link/link';
import renderDOM from '../../utils/renderDOM';
import registerComponent from '../../utils/registerComponent';

// import components from './components/**/index.js';

// // import components from './components/**/*.ts';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);
  registerComponent(Input);
  registerComponent(Link);

  const page = new RegisterPage();

  renderDOM('#app', page);
});
