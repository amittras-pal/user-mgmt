import { Field, FormikProvider, useFormik } from "formik";
import { Button, Col, Row, Form } from "react-bootstrap";
import * as yup from "yup";

const roleSchema = yup.object().shape({
  roleLabel: yup.string().required("Role Name is required."),
});

export default function RoleForm({ editRole, onComplete, onCancel }) {
  const form = useFormik({
    initialValues: {
      roleKey: editRole?.roleKey ?? 0,
      roleLabel: editRole?.roleLabel ?? "",
    },
    validationSchema: roleSchema,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: true,
    onSubmit: onComplete,
  });

  return (
    <FormikProvider value={form}>
      <Form className="mt-3 border p-3 bg-light" onSubmit={form.handleSubmit}>
        <h5 className="text-muted">
          {editRole
            ? `Edit Role - ${editRole.roleLabel} (${editRole.roleKey})`
            : "Add New Role"}
        </h5>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                className="rounded-0"
                isInvalid={form.errors.roleLabel}
                as={Field}
                name="roleLabel"
                placeholder="Role Name"
                size="sm"
                autoFocus
              />
              <Form.Text className="text-danger">
                {form.errors.roleLabel}
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
