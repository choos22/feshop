import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup, createNewUser } from '../../services/userServices';
import { toast } from 'react-toastify';
import { cloneDeep, values } from 'lodash';
import _ from 'lodash';
const ModalUser = (props) => {
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [username, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  // const [address, setAddress] = useState('');
  // const [sex, setSex] = useState('');
  // const [group, setGroup] = useState('');

  const defaultUserData = {
    email: '',
    phone: '',
    username: '',
    password: '',
    address: '',
    sex: '',
    group: '',
  };

  const validateInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [validInputs, setValidInputs] = useState(validateInputsDefault);
  //load động group gọi api
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    getGroup();
  }, []);

  //api
  const getGroup = async () => {
    let res = await fetchGroup();
    if (res.data && res.data.EC === 0) {
      setUserGroups(res.data.DT);
      toast.success(res.data.EM);
      if (res.data.DT && res.data.DT.length > 0) {
        let groups = res.data.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.console.error(res.data.EM);
    }
  };

  const handleEventOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidInput = () => {
    setValidInputs(validateInputsDefault);
    let arr = ['email', 'phone', 'password', 'group'];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validateInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);
        toast.error(`Emty Input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = async () => {
    let check = checkValidInput();
    if (check === true) {
      let res = await createNewUser({
        ...userData,
        groupId: userData['group'],
      });
      console.log('check res', res);
      if (res.data && res.data.EC === 0) {
        props.onHide();
        setUserData({ ...defaultUserData, group: userGroups[0].id });
      } else {
        toast.error('Lỗi tạo');
      }
    }
  };
  return (
    <>
      <Modal
        size="lg"
        centered
        show={props.show}
        className="modal-user"
        onHide={props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>{props.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address (<span className="red-start">*</span>
                ):
              </label>
              <input
                className={
                  validInputs.email ? 'form-control' : 'form-control is-invalid'
                }
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handleEventOnChangeInput(event.target.value, 'email')
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone Number (<span className="red-start">*</span>
                ):
              </label>
              <input
                className={
                  validInputs.phone ? 'form-control' : 'form-control is-invalid'
                }
                type="text"
                value={userData.phone}
                onChange={(event) =>
                  handleEventOnChangeInput(event.target.value, 'phone')
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>UserName :</label>
              <input
                className={
                  validInputs.username
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                type="text"
                value={userData.username}
                onChange={(event) =>
                  handleEventOnChangeInput(event.target.value, 'username')
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password (<span className="red-start">*</span>
                ):
              </label>
              <input
                className={
                  validInputs.password
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                type="password"
                value={userData.password}
                onChange={(event) =>
                  handleEventOnChangeInput(event.target.value, 'password')
                }
              />
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address :</label>
              <input
                className={
                  validInputs.address
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                type="text"
                value={userData.address}
                onChange={(event) =>
                  handleEventOnChangeInput(event.target.value, 'address')
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender :</label>
              <select className="form-select">
                <option defaultValue="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">LGBT</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red-start">*</span>
                ):
              </label>
              <select className="form-select">
                {userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group-${index}`} values={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Bỏ
          </Button>
          <Button onClick={() => handleConfirmUser()}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
