import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function Users(props) {
  let history = useHistory();
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (!session) {
      history.push('/login');
    }
  }, []);
  return <div>douma user</div>;
}

export default Users;
