class ValidForm {
  static checks = {
    email: {
      check: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
      error: 'Поле должно содержать латинские буквы, знак @ и домен',
    },
    login: {
    // пропускает спецсимволы и кириллицу.
      check: /(?=^.{3,20}$)(?=.*\d?)(?=.*[a-zA-Z]+).*$/,
      error: 'Поле должно содержать латинские буквы; длина 3-20 символов; без спецсимволов',
    },
    password: {
      check: /(?=^.{8,40}$)((?=.*\d+)|(?=.*\W+))(?![.\n])(?=.*[A-Z]+)(?=.*[a-z]).*$/,
      error: 'Поле должно содержать минимум одну заглавную букву и цифру; длина 8-40 символов',
    },
    newPassword: {
      check: /(?=^.{8,40}$)((?=.*\d+)|(?=.*\W+))(?![.\n])(?=.*[A-Z]+)(?=.*[a-z]).*$/,
      error: 'Поле должно содержать минимум одну заглавную букву и цифру; длина 8-40 символов',
    },
    phone: {
      check: /^\+?\d{10,15}/,
      error: 'Длина 10-15 символов; без пробелов',
    },
    first_name: {
      check: /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ_-]*$/,
      error: 'Первая буква заглавная; нет пробелов, цифр, спецсимволов',
    },
    second_name: {
      check: /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ_-]*$/,
      error: 'Первая буква заглавная; нет пробелов, цифр, спецсимволов',
    },
    display_name: {
      check: /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ_-]*$/,
      error: 'Первая буква заглавная; нет пробелов, цифр, спецсимволов',
    },
    message: {
      check: /\S+/,
      error: 'Поле не должно быть пустым',
    },
  };

  protected readonly form: HTMLFormElement;

  protected readonly fields: NodeListOf<HTMLElement>;

  protected btn: HTMLElement;

  protected iserror: Boolean;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.fields = this.form.querySelectorAll('.form-field');
    this.btn = this.form.querySelector('[type=submit]');
    this.iserror = false;
    this.registerEventsHandler();
  }

  static getElement(el: any) {
    return el.nextElementSibling;
  }

  registerEventsHandler() {
    this.btn.addEventListener('click', this.validForm.bind(this));
    if (!this.form.classList.contains('messages-send')) {
      this.form.addEventListener('focus', () => {
        const el = document.activeElement;
        if (el === this.btn) return;
        this.cleanError(el);
      }, true);
      for (const field of this.fields) {
        field.addEventListener('blur', this.validBlurField.bind(this));
      }
    }
  }

  validForm(e: any) {
    e.preventDefault();
    const formData: FormData = new FormData(this.form);
    let error: string;

    for (const property of formData.keys()) {
      error = this.getError(formData, property);
      if (error.length === 0) continue;
      this.iserror = true;
      this.showError(property, error);
    }

    if (this.iserror) return;
    // this.sendFormData(formData);
  }

  validBlurField(e: any) {
    const { target } = e;
    const property = target.getAttribute('name');
    const { value } = target;

    const formData = new FormData();
    formData.append(property, value);

    const error = this.getError(formData, property);
    if (error.length === 0) return;
    this.showError(property, error);
  }

  getError(formData: FormData, property: string) {
    let error = '';
    // переписать просто на функцию
    const validate = {
      [property]: () => {
        if (ValidForm.checks[property].check.test(formData.get(`${property}`)) === false) {
          error = ValidForm.checks[property].error;
        }
      },
    };

    if (property in ValidForm.checks) {
      validate[property]();
    }
    return error;
  }

  showError(property: string, error: string) {
    const el = this.form.querySelector(`[name=${property}]`) as HTMLElement | null;
    const errorBox = ValidForm.getElement(el);

    el.parentElement.classList.add('form__error');
    errorBox.innerHTML = error;
    errorBox.style.display = 'block';
  }

  cleanError(el: Element) {
    const errorBox = ValidForm.getElement(el);
    if (el.parentElement.classList.contains('form__error')) el.parentElement.classList.remove('form__error');
    errorBox.removeAttribute('style');
    this.iserror = false;
  }

//   sendFormData(formData) {}
}

const form = document.querySelector('[id=form]') as HTMLFormElement | null;
if (form) new ValidForm(form);
