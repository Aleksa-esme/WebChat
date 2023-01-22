const comparePasswords = (name: string): boolean => {
  const passwordInputs = Array.from(document.querySelectorAll(`input[name="${name}"]`));
  return passwordInputs[0].value === passwordInputs[1].value;
};

export default comparePasswords;
