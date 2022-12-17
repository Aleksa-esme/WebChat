import ProfilePasswordPage from './profilePassword';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import renderDOM from '../../utils/renderDOM';
import registerComponent from '../../utils/registerComponent';

// import components from './components/**/index.js';

// // import components from './components/**/*.ts';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);
  registerComponent(Input);

  const page = new ProfilePasswordPage();

  renderDOM('#app', page);
});
