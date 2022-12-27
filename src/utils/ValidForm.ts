const passwordReg = /(?=^.{8,40}$)((?=.*\d+)|(?=.*\W+))(?![.\n])(?=.*[A-Z]+)(?=.*[a-z]).*$/;
const nameReg = /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ_-]*$/;

interface IChecks {
  [index: string]: {
    check: RegExp,
    error: string,
  };
}

const checks: IChecks = {
  email: {
    check: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
    error: 'Email должен содержать латинские буквы, знак @ и домен',
  },
  login: {
    check: /^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/,
    error: 'Логин должен содержать латинские буквы; длина 3-20 символов; без спецсимволов',
  },
  password: {
    check: passwordReg,
    error: 'Пароль должен содержать минимум одну заглавную букву и цифру; длина 8-40 символов',
  },
  newPassword: {
    check: passwordReg,
    error: 'Пароль должен содержать минимум одну заглавную букву и цифру; длина 8-40 символов',
  },
  phone: {
    check: /^\+?\d{10,15}/,
    error: 'Длина 10-15 символов; без пробелов',
  },
  first_name: {
    check: nameReg,
    error: 'Первая буква заглавная; нет пробелов, цифр, спецсимволов',
  },
  second_name: {
    check: nameReg,
    error: 'Первая буква заглавная; нет пробелов, цифр, спецсимволов',
  },
  display_name: {
    check: nameReg,
    error: 'Первая буква заглавная; нет пробелов, цифр, спецсимволов',
  },
  message: {
    check: /\S+/,
    error: 'Сообщение не должно быть пустым',
  },
};

let iserror: Boolean = false;

const getElement = (el: any) => el.nextElementSibling;

const getError = (formData: FormData, property: string) => {
  let error = '';

  if (property in checks) {
    if (checks[property].check.test(formData.get(`${property}`)) === false) {
      error = checks[property].error;
    }
  }
  return error;
};

const showError = (form: HTMLFormElement, property: string, error: string) => {
  const el = form.querySelector(`[name=${property}]`) as HTMLElement | null;
  const errorBox = getElement(el);

  el?.parentElement?.classList.add('form__error');
  errorBox.innerHTML = error;
  errorBox.style.display = 'block';
};

const cleanError = (el: Element) => {
  const errorBox = getElement(el);
  if (el?.parentElement?.classList.contains('form__error')) el.parentElement.classList.remove('form__error');
  errorBox.removeAttribute('style');
  iserror = false;
};

//   sendFormData(formData) {}

export const validateForm = (e: Event) => {
  const form = document.querySelector('[id=form]') as HTMLFormElement;
  e.preventDefault();
  const formData: FormData = new FormData(form);
  let error: string;

  for (const property of formData.keys()) {
    error = getError(formData, property);
    if (error.length === 0) continue;
    iserror = true;
    showError(form, property, error);
  }

  if (iserror) return;
  // this.sendFormData(formData);
};

export const validFocusField = (e: Event) => {
  const form = document.querySelector('[id=form]') as HTMLFormElement;
  const btn = form.querySelector('[type=submit]') as HTMLElement;
  const el = e?.target;
  if (el === btn) return;
  if (el) cleanError(el);
};

export const validBlurField = (e: any) => {
  const form = document.querySelector('[id=form]') as HTMLFormElement;
  const { target } = e;
  const property = target.getAttribute('name');
  const { value } = target;

  const formData = new FormData();
  formData.append(property, value);

  const error = getError(formData, property);
  if (error.length === 0) return;
  showError(form, property, error);
};
