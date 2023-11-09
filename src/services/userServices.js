import asios from 'axios';

const registerNewUser = (email, phone, username, password) => {
  return asios.post('http://localhost:8080/api/v1/register', {
    email,
    phone,
    username,
    password,
  });
};
const loginUser = (valueLogin, password) => {
  return asios.post('http://localhost:8080/api/v1/login', {
    valueLogin,
    password,
  });
};

export { registerNewUser, loginUser };
