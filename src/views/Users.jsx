import React, { useState } from "react";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, update } from "../redux/user.slice";
import UserForm from "./UserForm";

export default function Users() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const closeForm = () => {
    setEditUser(null);
    setShowForm(false);
  };

  const handleSave = (data) => {
    if (editUser) dispatch(update(data));
    else dispatch(add(data));
    closeForm();
  };

  const openUpdateForm = (data) => {
    setEditUser(data);
    setShowForm(true);
  };

  const openConfirmation = (user) => {
    setConfirmDelete(user);
  };

  const hideModal = () => {
    setConfirmDelete(null);
  };

  const deleteUser = () => {
    dispatch(remove(confirmDelete?.id));
    hideModal();
  };

  return (
    <>
      <div className="container py-3">
        <div className="d-flex justify-content-between py-3 border-bottom ">
          <h2 className="m-0 text-primary">Users</h2>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Add User
          </Button>
        </div>
        {showForm && (
          <UserForm
            editUser={editUser}
            onComplete={handleSave}
            onCancel={closeForm}
          />
        )}
        <div className="mt-3">
          <Table bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>User ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ width: "40px" }}>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" size="sm" />
                      <Dropdown.Menu className="rounded-0 shadow border-0">
                        <Dropdown.Item onClick={() => openUpdateForm(user)}>
                          Update
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => openConfirmation(user)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={!!confirmDelete} onHide={hideModal} centered>
        <Modal.Header>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the user{" "}
          <span className="fw-bold">{confirmDelete?.name}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
