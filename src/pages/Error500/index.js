import Error500 from './Error500';
import Link from '../../components/link/link';
import renderDOM from '../../utils/renderDOM';
import registerComponent from '../../utils/registerComponent';

// import components from './components/**/index.js';

// // import components from './components/**/*.ts';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Link);

  const page = new Error500();

  renderDOM('#app', page);
});
