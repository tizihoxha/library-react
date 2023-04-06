import { useState } from "react";
import { inputHelper, toastNotify } from "../Helper";
import { useRegisterUserMutation } from "../Apis/authApi";
import {useNavigate} from "react-router-dom"
import MainLoader from "../Components/Common/MainLoader";
import { apiResponse } from "../Interfaces";
import { SD_Roles } from "../Utility/SD";


function Register() {
    const [registerUser] = useRegisterUserMutation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
      userName: "",
      password: "",
      role: "",
      name: "",
    });
  
    const handleUserInput = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const tempData = inputHelper(e, userInput);
      setUserInput(tempData);
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const response: apiResponse = await registerUser({
        userName: userInput.userName,
        password: userInput.password,
        role: userInput.role,
        name: userInput.name,
      });
      if (response.data) {
        toastNotify("Registeration successful! Please login to continue.");
        navigate("/login");
      } else if (response.error) {
        toastNotify(response.error.data.errorMessages[0], "error");
      }
  
      setLoading(false);
    };
  
    return (
<div className="container text-center py-5 rounded">
  {loading && <MainLoader />}
  <form method="post" onSubmit={handleSubmit}>
    <h1 className="mb-4">Register</h1>
    <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6 col-sm-8 col-xs-12">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Enter Username"
            required
            name="userName"
            value={userInput.userName}
            onChange={handleUserInput}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Enter Name"
            required
            name="name"
            value={userInput.name}
            onChange={handleUserInput}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control rounded-pill"
            placeholder="Enter Password"
            required
            name="password"
            value={userInput.password}
            onChange={handleUserInput}
          />
        </div>
        <div className="form-group mb-3">
          <select
            className="form-control form-select rounded-pill"
            required
            value={userInput.role}
            name="role"
            onChange={handleUserInput}
          >
            <option value="">--Select Role--</option>
            <option value={`${SD_Roles.AUTHOR}`}>Author</option>
            <option value={`${SD_Roles.ADMIN}`}>Admin</option>
          </select>
        </div>
        <div className="form-group">

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block rounded-pill mt-4"
            disabled={loading}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </form>
</div>



    );
  }
  
  export default Register;