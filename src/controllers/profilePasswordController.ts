import { changePassword } from 'services/user';
import { validateForm } from 'utils/Validation/ValidForm';
import comparePasswords from 'utils/helpers/comparePasswords';

const onChangePassword = (event: Event) => {
  const isError = validateForm(event, 'form');
  if (!isError) {
    const passwordData = {
      oldPassword: (document.querySelector('input[name="oldPassword"]') as HTMLInputElement).value,
      newPassword: (document.querySelector('input[name="newPassword"]') as HTMLInputElement).value,
    };

    if (comparePasswords('newPassword')) window.store.dispatch(changePassword, passwordData);
    else alert('Пароли должны совпадать');
  }
};

export default onChangePassword;
