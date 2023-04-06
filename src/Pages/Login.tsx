import { useState } from "react";
import { useLoginUserMutation } from "../Apis/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inputHelper } from "../Helper";
import { apiResponse, userModel } from "../Interfaces";
import { setLoggedInUser } from "../Storage/Redux/userAuthAlice";
import jwt_decode from "jwt-decode";
import MainLoader from "../Components/Common/MainLoader";


function Login() {
    const [error, setError] = useState("");
    const [loginUser] = useLoginUserMutation();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
      userName: "",
      password: "",
    });
  
    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const tempData = inputHelper(e, userInput);
      setUserInput(tempData);
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const response: apiResponse = await loginUser({
        userName: userInput.userName,
        password: userInput.password,
      });
      if (response.data) {
        const { token } = response.data.result;
        const { fullName, id, email, role }: userModel = jwt_decode(token);
        localStorage.setItem("token", token);
        dispatch(setLoggedInUser({ fullName, id, email, role }));
        navigate("/");
      } else if (response.error) {
        setError(response.error.data.errorMessages[0]);
      }
  
      setLoading(false);
    };
    return (
      <div className="container text-center py-5 rounded">
      {loading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mb-4">Login</h1>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-8 col-xs-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control rounded-pill mb-3"
                placeholder="Enter Username"
                required
                name="userName"
                value={userInput.userName}
                onChange={handleUserInput}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control rounded-pill mb-4"
                placeholder="Enter Password"
                required
                name="password"
                value={userInput.password}
                onChange={handleUserInput}
              />
            </div>
            <div className="form-group">
              {error && <p className="text-danger">{error}</p>}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block rounded-pill"
                style={{fontSize: "1.2rem"}}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    

    );
  }
  
  export default Login;