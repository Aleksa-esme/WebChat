const form = document.getElementById('form');

const sendData = event => {
  event.preventDefault();

  const data = {};
  Array
    .from(event.target)
    .forEach(field => {
      if (field.name) data[field.name] = field.value;
    });
  console.log(data);
};

if (form) form.addEventListener('submit', sendData);
