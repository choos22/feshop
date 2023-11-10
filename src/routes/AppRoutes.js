import React from 'react';
import Users from '../components/ManageUser/Users';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import {
  //   BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom/cjs/react-router-dom';
import PrivateRoutes from './PrivateRoutes';
function AppRoutes(props) {
  const Projects = () => {
    return <span>douma m</span>;
  };
  return (
    <>
      <Switch>
        <Route path="/" exact>
          home
        </Route>
        <Route path="/project">project</Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Projects} />
        <Route path="*">404</Route>
      </Switch>
    </>
  );
}

export default AppRoutes;
