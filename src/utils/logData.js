const logData = event => {
  event.preventDefault();

  const data = {};
  const formData = new FormData(form);

  for (const [key, value] of formData) {
    Object.assign(data, { [key]: value });
  }
  console.log(data);
};

export default logData;
