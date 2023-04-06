import { NavLink, useNavigate } from "react-router-dom";
import { userModel } from "../../Interfaces";
import { RootState } from "../../Storage/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { emptyUserState, setLoggedInUser } from "../../Storage/Redux/userAuthAlice";

let logo = require("../../Assets/Images/LIBRAT.png");
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const role = userData.role;

  const isAdmin = role === "admin";
  const isAuthor = role === "author";

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg  "
        style={{
          backgroundImage: "linear-gradient(to bottom right, #FFF8DC, #FFE5B4)",
          backgroundColor: "rgba(245, 250, 252, 0.5)",
          height: "8vh",
        }}
      >
        <div className="container-fluid">
          <img src={logo} style={{ height: "40px" }} className="m-1" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

            {userData.id ? ( 
              <>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/authorsList"
                >
                  Author
                </NavLink>
              </li>

              {isAdmin ? (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <ul className="dropdown-menu">
                      <li
                        style={{ cursor: "pointer" }}
                        className="dropdown-item"
                        onClick={() => navigate("/category/categorylist")}
                      >
                        Manage Categories
                      </li>
                      <li
                        style={{ cursor: "pointer" }}
                        className="dropdown-item"
                        onClick={() => navigate("/author/authorlist")}
                      >
                        Manage Authors
                      </li>
                      <li
                        style={{ cursor: "pointer" }}
                        className="dropdown-item"
                        onClick={() => navigate("/book/bookl")}
                      >
                        Manage Books
                      </li>
                    </ul>
                  </li>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Author Panel
                    </a>
                    <ul className="dropdown-menu">
                      <li
                        style={{ cursor: "pointer" }}
                        className="dropdown-item"
                        onClick={() => navigate("/book/bookl")}
                      >
                        Manage Books
                      </li>
                    </ul>
                  </li>
                </>
              )}
              </>
              ) : (<></>)}
              <div className="d-flex" style={{ marginLeft: "auto" }}>
                {userData.id && (
                  <>
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0,
                        }}
                      >
                        Welcome, {userData.fullName}
                      </button>
                    </li>

                    <li className="nav-item text-white">
                      <button
                        className="btn btn-outline rounded-pill text-white mx-2"
                        style={{
                          backgroundColor: "#007BFF",
                          color: "rgba(255, 255, 255, 0.8)",
                          height: "40px",
                          width: "100px",
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {!userData.id && (
                  <>
                    <li className="nav-item text-white">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item text-white">
                      <NavLink
                        className="btn btn-outline rounded-pill text-white mx-2"
                        style={{
                          backgroundColor: "#007BFF",
                          color: "rgba(255, 255, 255, 0.8)",
                          height: "40px",
                          width: "100px",
                        }}
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
