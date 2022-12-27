import Link from 'components/link/Link';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import Error404 from './Error404';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Link);

  const page = new Error404({});

  renderDOM('#app', page);
});
