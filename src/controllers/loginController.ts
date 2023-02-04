import { login } from 'services/auth';
import { validateForm } from 'utils/Validation/ValidForm';

const onLogin = (event: Event) => {
  const isError = validateForm(event);
  if (!isError) {
    const loginData = {
      login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
      password: (document.querySelector('input[name="password"]') as HTMLInputElement).value,
    };
    window.store.dispatch(login, loginData);
  }
};

export default onLogin;
