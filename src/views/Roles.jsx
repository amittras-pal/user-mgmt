import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, update } from "../redux/roles.slice";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import RoleForm from "./RoleForm";

export default function Roles() {
  const roles = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const closeForm = () => {
    setEditRole(null);
    setShowForm(false);
  };

  const handleSave = (data) => {
    if (editRole) dispatch(update(data));
    else dispatch(add(data));
    closeForm();
  };

  const openUpdateForm = (data) => {
    setEditRole(data);
    setShowForm(true);
  };

  const openConfirmation = (role) => {
    setConfirmDelete(role);
  };

  const hideModal = () => {
    setConfirmDelete(null);
  };

  const deleteRole = () => {
    dispatch(remove(confirmDelete?.roleKey));
    hideModal();
  };

  return (
    <>
      <div className="container py-3">
        <div className="d-flex justify-content-between py-3 border-bottom ">
          <h2 className="m-0 text-primary">Roles</h2>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Add Role
          </Button>
        </div>
        {showForm && (
          <RoleForm
            editRole={editRole}
            onComplete={handleSave}
            onCancel={closeForm}
          />
        )}
        <div className="mt-3">
          <Table bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Role ID</th>
                <th>Role Name</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td style={{ width: "40px" }}>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" size="sm" />
                      <Dropdown.Menu className="rounded-0 shadow border-0">
                        <Dropdown.Item onClick={() => openUpdateForm(role)}>
                          Update
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => openConfirmation(role)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>{role.roleKey}</td>
                  <td>{role.roleLabel}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={!!confirmDelete} onHide={hideModal} centered>
        <Modal.Header>
          <Modal.Title>Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the role{" "}
          <span className="fw-bold">{confirmDelete?.roleLabel}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={deleteRole}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
