import { changeAvatar, changeData } from 'services/user';
import { validateForm } from 'utils/Validation/ValidForm';

export const onChangeProfile = (event: Event) => {
  const isError = validateForm(event);
  if (!isError) {
    const profileData = {
      email: (document.querySelector('input[name="email"]') as HTMLInputElement).value,
      login: (document.querySelector('input[name="login"]') as HTMLInputElement).value,
      first_name: (document.querySelector('input[name="first_name"]') as HTMLInputElement).value,
      second_name: (document.querySelector('input[name="second_name"]') as HTMLInputElement).value,
      display_name: (document.querySelector('input[name="display_name"]') as HTMLInputElement).value,
      phone: (document.querySelector('input[name="phone"]') as HTMLInputElement).value,
    };

    window.store.dispatch(changeData, profileData);
  }
};

export const onChangeAvatar = (event: SubmitEvent) => {
  event.preventDefault();

  const avatar = document.querySelector('input[name="avatar"]') as HTMLInputElement;
  const curFile = avatar.files![0];

  const form = document.getElementById('avatar_form');
  const formData = new FormData(form as HTMLFormElement);
  if (!!curFile && curFile.size <= 1048576) window.store.dispatch(changeAvatar, formData);
  else if (!!curFile && curFile.size > 1048576) alert('Размер файла не должен превышать 1МБ');
  else alert('Файл не выбран');
};
