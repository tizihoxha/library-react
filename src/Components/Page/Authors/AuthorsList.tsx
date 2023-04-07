import { useEffect } from "react";
import { setAuthor } from "../../../Storage/Redux/authorSlice";
import { useDispatch } from "react-redux";
import { useGetBooksByAuthorQuery } from "../../../Apis/bookApi";
import { authorModel } from "../../../Interfaces";
import AuthorsCard from "./AuthorsCard";
import { Link } from "react-router-dom";


function AuthorsList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetBooksByAuthorQuery(null);
  console.log(data);
  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setAuthor(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="container row">
      {data &&
        data.length > 0 &&
        data.map((author: authorModel, index: number) => (
          <AuthorsCard author={author} key={index} />
        ))}
    </div>
    <div className="text-left mt-4  mb-8" style={{ marginBottom: '50px', marginLeft: '650px'  }}>
      <Link to="/" className="btn btn-outline-dark p">
        Back to Home
      </Link>
    </div>
    </>
  );
}

export default AuthorsList;
