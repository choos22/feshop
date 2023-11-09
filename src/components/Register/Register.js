import React, { useEffect, useState } from 'react';
import './Register.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import asios from 'axios';

import { registerNewUser } from '../../services/userServices';

function Register(props) {
  let history = useHistory();
  const handleLongin = () => {
    history.push('/login');
  };

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPass] = useState('');
  const [entPass, setEnPast] = useState('');

  //hiiện vạch đỏ khi chưa điền
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidEntPass: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const isValiInput = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      toast.error('Email is required!');

      //check điền đúng chưa, chưa đúng thì đè isValidEmail false hiện đỏ chưa thì giữ nguyên
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error('Please enter a vaild email address!');
      return false;
    }
    if (!phone) {
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      toast.error('Phone is required!');
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error('Password is required!');
      return false;
    }
    if (password != entPass) {
      setObjCheckInput({ ...defaultValidInput, isValidEntPass: false });
      toast.error('Your password is not the same');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValiInput();
    if (check === true) {
      let response = await registerNewUser(email, phone, username, password);
      // console.log(response);
      let serverData = response.data;

      //nếu đúng trả ra thông báo và back về /login còn sai thì trả ra thông báo ẻr
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push('/login');
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  useEffect(() => {
    // asios.get('http://localhost:8080/api-test').then((data) => {
    //   console.log('aaaaaaa', data);
    // });
  }, []);
  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">MixiGaming</div>
            <div className="detail">From MixiGaming with love</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3 ">
            <div className="brand d-sm-none">MixiGaming</div>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="email"
                className={
                  objCheckInput.isValidEmail
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder="Email or your phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number: </label>
              <input
                type="text"
                className={
                  objCheckInput.isValidPhone
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Username: </label>
              <input
                type="text"
                className="form-control"
                placeholder="User name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <input
                type="password"
                className={
                  objCheckInput.isValidPassword
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder="Password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password: </label>
              <input
                type="password"
                className={
                  objCheckInput.isValidEntPass
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder="Re-enter Password"
                value={entPass}
                onChange={(e) => setEnPast(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              type="button"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <hr />
            <button className="btn btn-success" onClick={() => handleLongin()}>
              Already've an account. Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
