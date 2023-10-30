import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import IOperation from "../types/operation.type";

const AddOperationForm = ({
  operations = [],
  addOperation,
  errors = [],
  cancelOperation,
}: {
  operations: IOperation[];
  addOperation: (operation_id: number, amount: number) => void;
  errors: string[];
  cancelOperation: () => void;
}) => {
  const validationSchema = Yup.object().shape({
    amount: Yup.number().required("Amount must be provided"),
    operation: Yup.string().required("Operation must be selected"),
  });

  const handleOnAddOperation = async (formValue: any) => {
    const { operation, amount } = formValue;
    addOperation(parseInt(operation), amount);
  };

  return (
    <>
      <Formik
        initialValues={{ amount: 0, operation: "" }}
        validationSchema={validationSchema}
        onSubmit={handleOnAddOperation}
      >
        <Form style={{ width: "330px" }}>
          <h1 className="h3 mb-3 font-weight-normal">Create operation</h1>
          <div className="form-group">
            <label htmlFor="operation">Choose an operation</label>
            <Field as="select" className="form-control" name="operation">
              <option value="">Select...</option>
              {operations.map(({ id, type }) => (
                <option value={id}>{type}</option>
              ))}
            </Field>
            <ErrorMessage
              name="operation"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount"> Amount </label>
            <Field name="amount" type="number" className="form-control" />
            <ErrorMessage
              name="amount"
              component="div"
              className="text-danger"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Send Operation
          </button>
          <div className="btn btn-block" onClick={cancelOperation}>
            Cancel
          </div>
        </Form>
      </Formik>
      <div>
        {errors.map((error, index) => {
          return (
            <div key={index} className="alert alert-danger">
              {error}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddOperationForm;
