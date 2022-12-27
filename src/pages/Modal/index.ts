import Button from 'components/button/Button';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import Modal from './Modal';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);

  const page = new Modal({});

  renderDOM('#app', page);
});
