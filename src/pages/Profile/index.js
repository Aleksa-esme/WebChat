import ProfilePage from './profile';
import Input from '../../components/input/input';
import Link from '../../components/link/link';
import renderDOM from '../../utils/renderDOM';
import registerComponent from '../../utils/registerComponent';

// import components from './components/**/index.js';

// // import components from './components/**/*.ts';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Input);
  registerComponent(Link);

  const page = new ProfilePage();

  renderDOM('#app', page);
});
