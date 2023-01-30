const comparePasswords = (name: string): boolean => {
  const passwordInputs = Array.from(document.querySelectorAll(`input[name="${name}"]`));
  return (passwordInputs[0] as HTMLInputElement).value === (passwordInputs[1] as HTMLInputElement).value;
};

export default comparePasswords;
