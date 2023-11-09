import './App.scss';
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom/cjs/react-router-dom';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import Users from './components/ManageUser/Users';
import { useEffect, useState } from 'react';
import _ from 'lodash';
function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <>
      <Router>
        <div className="app-container">
          {/* nếu có account và account không rỗng và  */}
          {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
          <Switch>
            <Route path="/" exact>
              home
            </Route>
            <Route path="/about">about</Route>
            <Route path="/news">news</Route>
            <Route path="/contact">contact</Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="*">404</Route>
          </Switch>
        </div>

        {/* Same as */}
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
