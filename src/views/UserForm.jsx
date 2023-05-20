import { Field, FormikProvider, useFormik } from "formik";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required("Full Name is required."),
  email: yup.string().email("Invalid Email.").required("Email ID is required."),
  username: yup.string().required("Username is required."),
  mobile: yup
    .number("Invalid Number.")
    .min(1000000000, "Invalid Number.")
    .max(9999999999, "Invalid Number."),
  roleKey: yup.number().required("User Role is required."),
  password: yup.string().required("Password is required."),
});

export default function UserForm({ editUser, onComplete, onCancel }) {
  const roles = useSelector((state) => state.roles);
  const form = useFormik({
    initialValues: {
      id: editUser?.id ?? 0,
      name: editUser?.name ?? "",
      email: editUser?.email ?? "",
      username: editUser?.username ?? "",
      mobile: editUser?.mobile ?? "",
      roleKey: editUser?.roleKey ?? "",
      password: "",
    },
    validationSchema: userSchema,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: true,
    onSubmit: onComplete,
  });

  return (
    <FormikProvider value={form}>
      <Form className="mt-3 border p-3 bg-light" onSubmit={form.handleSubmit}>
        <h5 className="text-muted">
          {editUser
            ? `Edit User - ${editUser.name} (${editUser.id})`
            : "Add New User"}
        </h5>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="rounded-0"
                isInvalid={form.errors.name}
                as={Field}
                name="name"
                placeholder="Name"
                size="sm"
                autoFocus
              />
              <Form.Text className="text-danger">{form.errors.name}</Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="rounded-0"
                as={Field}
                name="username"
                isInvalid={form.errors.username}
                placeholder="Username"
                size="sm"
              />
              <Form.Text className="text-danger">
                {form.errors.username}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                className="rounded-0"
                as={Field}
                isInvalid={form.errors.email}
                name="email"
                placeholder="Email Address"
                size="sm"
              />
              <Form.Text className="text-danger">{form.errors.email}</Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                className="rounded-0"
                as={Field}
                isInvalid={form.errors.email}
                name="mobile"
                placeholder="Mobile Number"
                size="sm"
              />
              <Form.Text
                className={`text-${form.errors.mobile ? "danger" : "muted"}`}
              >
                {form.errors.mobile ?? "10-digit phone numbers are accepted."}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Passowrd</Form.Label>
              <Form.Control
                className="rounded-0"
                as={Field}
                name="password"
                type="password"
                isInvalid={form.errors.password}
                placeholder="Passowrd"
                size="sm"
              />
              <Form.Text className="text-danger">
                {form.errors.password}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Field
                as={Form.Select}
                className="rounded-0"
                isInvalid={form.errors.roleKey}
                name="roleKey"
                size="sm"
              >
                <option value="">Select a Role</option>
                {roles.map((role) => (
                  <option value={role.roleKey}>{role.roleLabel}</option>
                ))}
              </Field>
              <Form.Text className="text-danger">
                {form.errors.roleKey}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex gap-2 justify-content-end mt-3">
          <Button variant="outline-danger" onClick={onCancel} size="sm">
            Cancel
          </Button>
          <Button
            variant="success"
            type="submit"
            size="sm"
            disabled={!form.isValid}
          >
            Save
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
}
