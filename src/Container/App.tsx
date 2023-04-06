import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/userAuthAlice";
import { userModel } from "../Interfaces";
import jwt_decode from "jwt-decode"
import { Header } from "../Components/Layout";
import { Route, Routes } from "react-router-dom";
import { AccessDenied, AuthenticationTest, AuthenticationTestAdmin, AuthorCreateEdit, AuthorList, BookCreateEdit, BookDetails, BookL, CategoryCreateEdit, CategoryList, Home, Login, Register } from "../Pages";
import AuthorsList from "../Components/Page/Authors/AuthorsList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/bookDetails/:bookId" element={<BookDetails />}></Route>
        
          <Route path="/authorsList" element={<AuthorsList />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />} />
          <Route path="/category/categorylist" element={<CategoryList />} />
          <Route
            path="/category/categoryCreateEdit/:id"
            element={<CategoryCreateEdit />}
          />
          <Route
            path="/category/categoryCreateEdit"
            element={<CategoryCreateEdit />}
          />
          <Route path="/author/authorlist" element={<AuthorList />} />
          <Route
            path="/author/authorCreateEdit/:id"
            element={<AuthorCreateEdit />}
          />
          <Route
            path="/author/authorCreateEdit"
            element={<AuthorCreateEdit />}
          />
          <Route path="/book/bookl" element={<BookL />} />
          <Route
            path="/book/bookCreateEdit/:id"
            element={<BookCreateEdit />}
          />
          <Route
            path="/book/bookCreateEdit"
            element={<BookCreateEdit />}
          />
        </Routes>
        
      </div>
    </div>
  );
}

export default App;
