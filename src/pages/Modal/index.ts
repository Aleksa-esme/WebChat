import Button from 'components/button/Button';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import Modal from './Modal';

// import components from './components/**/index.js';

// // import components from './components/**/*.ts';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);

  const page = new Modal();

  renderDOM('#app', page);
});
