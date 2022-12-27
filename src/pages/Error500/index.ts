import Link from 'components/link/Link';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import Error500 from './Error500';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Link);

  const page = new Error500({});

  renderDOM('#app', page);
});
