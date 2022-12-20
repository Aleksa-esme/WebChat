const logData = (event: Event) => {
  event.preventDefault();
  const form = document.getElementById('form');
  const data = {};
  const formData = new FormData(form as HTMLFormElement);

  for (const [key, value] of formData) {
    Object.assign(data, { [key]: value });
  }
  console.log(data);
};

export default logData;
