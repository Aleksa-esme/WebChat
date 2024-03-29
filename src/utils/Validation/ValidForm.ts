const passwordReg = /(?=^.{8,40}$)((?=.*\d+)|(?=.*\W+))(?![.\n])(?=.*[A-Z]+)(?=.*[a-z]).*$/;
const nameReg = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ_-]*$/;
const emptyReg = /\S+/;

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
  chat_title: {
    check: emptyReg,
    error: 'Поле не должно быть пустым',
  },
  user_add: {
    check: emptyReg,
    error: 'Поле не должно быть пустым',
  },
  user_del: {
    check: emptyReg,
    error: 'Поле не должно быть пустым',
  },
};

let iserror: Boolean = false;

const getElement = (el: any) => el.nextElementSibling;

const getError = (formData: FormData, property: string) => {
  let error = '';
  if (property in checks) {
    const value = formData.get(`${property}`) as string;
    if (checks[property].check.test(value) === false) {
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

  const coords = el!.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const percentHeight = 100 - ((coords.top * 100) / windowHeight);

  if (percentHeight < 10) {
    const top = coords.height - errorBox.offsetHeight * 2;
    errorBox.style.top = `${top}px`;
  }
};

const cleanError = (el: Element) => {
  const errorBox = getElement(el);
  if (el?.parentElement?.classList.contains('form__error')) el.parentElement.classList.remove('form__error');
  errorBox.removeAttribute('style');
  iserror = false;
};

export const validateForm = (e: Event, formId: string) => {
  const form = document.querySelector(`[id=${formId}]`) as HTMLFormElement;
  e.preventDefault();
  const formData: FormData = new FormData(form);
  let error: string;

  for (const property of formData.keys()) {
    error = getError(formData, property);
    if (error.length === 0) continue;
    iserror = true;
    showError(form, property, error);
  }

  return iserror;
};

export const validFocusField = (e: Event, formId: string) => {
  const form = document.querySelector(`[id=${formId}]`) as HTMLFormElement;
  const btn = form.querySelector('[type=submit]') as HTMLElement;
  const el = e?.target as Element;
  if (el === btn) return;
  if (el) cleanError(el);
};

export const validBlurField = (e: any, formId: string) => {
  const form = document.querySelector(`[id=${formId}]`) as HTMLFormElement;
  const { target } = e;
  const property = target.getAttribute('name');
  const { value } = target;

  const formData = new FormData();
  formData.append(property, value);

  const error = getError(formData, property);
  if (error.length === 0) return;
  showError(form, property, error);
};
