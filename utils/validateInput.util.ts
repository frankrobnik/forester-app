const validateEmail = (email: string): boolean => {
  const regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  if (regex.test(email)) return true;
  else throw Error('Your email is not valid.');
};

const validateUsername = (username: string): boolean => {
  const trimed = username.trim();
  if (trimed.length < 3) throw new Error('Your username needs to be at least 3 characters long.');
  if (trimed.length > 20) throw new Error('Your username has to be max 20 characters long.');
  return true;
};

const validatePassword = (password: string): boolean => {
  if (password.length < 8) throw new Error('Your password needs to be at least 8 characters long.');
  if (password.length > 100) throw new Error('Your password has to be max 100 characters long.');
  return true;
};

export { validateUsername, validateEmail, validatePassword };
