const form = document.getElementById('form');

const logData = (event: any) => {
  event.preventDefault();

  const data = {};
  const formData = new FormData(form as HTMLFormElement);

  for (const [key, value] of formData) {
    Object.assign(data, { [key]: value });
  }
  console.log(data);
};

if (form) form.addEventListener('submit', logData);

export default logData;
