import React, { useEffect, useState } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userServices';
function Login(props) {
  let history = useHistory();

  const [valueLogin, setValueLogin] = useState('');
  const [password, setPassword] = useState('');

  const defaultValidInput = {
    isValidValueLogin: true,
    isValidValuePass: true,
  };
  const [objValueInput, setObjValueInput] = useState(defaultValidInput);

  const handleCreateNewAcount = () => {
    history.push('/register');
  };

  const handleLogin = async () => {
    if (!valueLogin) {
      setObjValueInput({ ...defaultValidInput, isValidValueLogin: false });
      toast.error('Please enter your email address or phone number');
      return;
    }
    if (!password) {
      setObjValueInput({ ...defaultValidInput, isValidValuePass: false });
      toast.error('Please enter your password');
      return;
    }

    let response = await loginUser(valueLogin, password);
    console.log(response);
    if (response.data && response && +response.data.EC === 0) {
      //success
      let data = {
        isAuthenticated: true,
        token: 'fake token',
      };
      sessionStorage.setItem('account', JSON.stringify(data));
      history.push('/users');
      window.location.reload();
    }
    if (response.data && response && +response.data.EC !== 0) {
      //err
      toast.error(response.data.EM);
    }
  };

  const handlePressEnter = (event) => {
    console.log();
    if (event.charCode === 13 && event.code === 'Enter') {
      handleLogin();
    }
  };

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      history.push('/');
      window.location.reload();
    }
  }, []);
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">MixiGaming</div>
            <div className="detail">From MixiGaming with love</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3 ">
            <div className="brand d-sm-none">MixiGaming</div>
            <input
              type="text"
              //nếu input hợp lệ (true) thì bình thường còn k thì hiện err(is-invalid)
              className={
                objValueInput.isValidValueLogin
                  ? 'form-control'
                  : 'is-invalid form-control'
              }
              placeholder="Email or your phone number"
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
            />
            <input
              type="password"
              className={
                objValueInput.isValidValuePass
                  ? 'form-control'
                  : 'is-invalid form-control'
              }
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyPress={(event) => {
                handlePressEnter(event);
              }}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-pas" href="#">
                Forgot your password?
              </a>
            </span>
            <hr />
            <button
              className="btn btn-success"
              onClick={() => handleCreateNewAcount()}
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
