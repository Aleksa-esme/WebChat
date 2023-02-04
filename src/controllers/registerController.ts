import { register } from 'services/auth';
import { validateForm } from 'utils/Validation/ValidForm';
import comparePasswords from 'utils/helpers/comparePasswords';

const onRegister = (event: Event) => {
  const isError = validateForm(event);

  if (!isError) {
    const registerData = {
      email: (document.querySelector('input[name="email"]') as HTMLInputElement).value,
      login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
      first_name: (document.querySelector('input[name="first_name"]') as HTMLInputElement).value,
      second_name: (document.querySelector('input[name="second_name"]') as HTMLInputElement).value,
      phone: (document.querySelector('input[name="phone"]') as HTMLInputElement).value,
      password: (document.querySelector('input[name="password"]') as HTMLInputElement).value,
    };

    if (comparePasswords('password')) window.store.dispatch(register, registerData);
    else alert('Пароли должны совпадать');
  }
};

export default onRegister;
