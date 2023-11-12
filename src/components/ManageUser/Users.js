import React, { useEffect, useState } from 'react';
import ReactPaginate from 'https://cdn.skypack.dev/react-paginate@7.1.3';
import { fetchAllUser, deleteUser } from '../../services/userServices';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';
function Users(props) {
  const [listUser, setListUser] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [isShowModalUser, setIsShowModalUser] = useState(false);

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

  const handleDeleteUser = async (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setDataModal({});

    setIsShowModalDelete(false);
  };

  const comfirmDeleteUser = async () => {
    let response = await deleteUser(dataModal);
    console.log('checkckkc dele', response);
    if (response && response.data.EC === 0) {
      toast.success(response.data.EM);
      await fetchUsers();
      setIsShowModalDelete(false);
    } else {
      toast.error(response.data.EM);
    }
  };

  //đóng modal
  const onHideModalUser = () => {
    setIsShowModalUser(false);
  };
  return (
    <>
      <div className="container mt-3">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title">
              <h3>Table user</h3>
            </div>
            <div className="actions">
              <button className="btn btn-success">Refesh</button>
              <button
                className="btn btn-primary"
                onClick={() => setIsShowModalUser(true)}
              >
                Add new user
              </button>
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
                  <th scope="col">Action</th>
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
                          <td>
                            <button className="btn btn-warning mx-3">
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteUser(item)}
                            >
                              Delete
                            </button>
                          </td>
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

      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        comfirmDeleteUser={comfirmDeleteUser}
        dataModal={dataModal}
      />

      <ModalUser
        title={'Tạo mới người dùng'}
        onHide={onHideModalUser}
        show={isShowModalUser}
      />
    </>
  );
}

export default Users;
