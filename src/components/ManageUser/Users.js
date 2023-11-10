import React, { useEffect, useState } from 'react';
import ReactPaginate from 'https://cdn.skypack.dev/react-paginate@7.1.3';
import { fetchAllUser } from '../../services/userServices';
function Users(props) {
  const [listUser, setListUser] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUser(currentPage, currentLimit);
    if (response && response.data && response.data.EC == 0) {
      setTotalPages(response.data.DT.totalPages);
      setListUser(response.data.DT.users);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="container mt-3">
      <div className="manage-users-container">
        <div className="user-header">
          <div className="title">
            <h3>Table user</h3>
          </div>
          <div className="actions">
            <button className="btn btn-success">Refesh</button>
            <button className="btn btn-primary">Add new user</button>
          </div>
        </div>
        <div className="user-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">UserName</th>
                <th scope="col">Group</th>
              </tr>
            </thead>
            <tbody>
              {listUser && listUser.length > 0 ? (
                <>
                  {listUser.map((item, index) => {
                    return (
                      <tr key={`row -${index}`}>
                        <th>{index + 1}</th>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.Group ? item.Group.name : ''}</td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td>Not found users</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="user-footer">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={4}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}

export default Users;
