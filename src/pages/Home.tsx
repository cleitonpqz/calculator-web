import { useEffect, useState } from "react";
import { getOperations } from "../services/operation-service";
import { logout } from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import IOperation from "../types/operation.type";
import AddOperationForm from "../components/AddOperationForm";
import { createRecord } from "../services/record-service";

const Home: React.FC = () => {
  const [showAddNewOperationForm, setShowAddNewOperationForm] =
    useState<boolean>(false);
  const [operations, setOperations] = useState<IOperation[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    getOperations()
      .then((operations) => setOperations(operations))
      .catch((error) => {
        logout();
        navigate("/login");
      });
  }, [navigate]);

  const handleAddOperation = async (operation_id: number, amount: number) => {
    const response = await createRecord(operation_id, amount);
    if (response.errorMessage) {
      if (response.errors) {
        setErrors(response.errors);
      } else {
        setErrors([response.errorMessage]);
      }
    } else {
      setMessage("Record created successfully");
      setShowAddNewOperationForm(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleCancelOperation = async () => {
    setShowAddNewOperationForm(false);
  };

  return (
    <div style={{ margin: "auto" }}>
      {showAddNewOperationForm ? (
        <AddOperationForm
          addOperation={handleAddOperation}
          operations={operations}
          errors={errors}
          cancelOperation={handleCancelOperation}
        />
      ) : (
        <div>
          <div
            className="btn btn-primary mb-2"
            onClick={() => {
              setShowAddNewOperationForm(true);
              setMessage("");
            }}
          >
            Add New Operation
          </div>
          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
