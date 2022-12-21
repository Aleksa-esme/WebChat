import Button from 'components/button/Button';
import Input from 'components/input/Input';
import renderDOM from 'utils/renderDOM';
import registerComponent from 'utils/registerComponent';
import ValidForm from 'utils/ValidForm';
import ProfileChangePage from './ProfileChange';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(Button);
  registerComponent(Input);

  const page = new ProfileChangePage({});

  renderDOM('#app', page);
  const form = document.querySelector('[id=form]') as HTMLFormElement | null;
  if (form) new ValidForm(form);
});
