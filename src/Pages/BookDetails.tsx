import { useSelector } from "react-redux";
import { useGetAuthorByIdQuery, useGetBookByIdQuery, useGetCategoryByIdQuery } from "../Apis/bookApi";
import { categoryModel, userModel } from "../Interfaces";
import { RootState } from "../Storage/Redux/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { withAuth } from "../HOC";


function BookDetails() {
  const { bookId } = useParams();
  const { data, isLoading } = useGetBookByIdQuery(bookId);
  const { data: author } = useGetAuthorByIdQuery(data?.authorId);
  const { data: category } = useGetCategoryByIdQuery(bookId);
  const navigate = useNavigate();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  const displayDetails = async (data: any) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
  }

  return (
    <div className="container pt-4 pt-md-5">
      {!isLoading && data && author ? (
        <div className="row">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <img
              src={data.image}
              alt={data.name}
              style={{ width: "100%", height: "600px", objectFit: "contain" }}
            />
          </div>
          <div className="col-lg-7">
            <>
              <h2 className="text-left" style={{ color: "#343a40" }}>
                {data.name}
              </h2>
              <div className="d-flex flex-row align-items-center mb-4">
                <span
                  className="badge text-light mr-2"
                  style={{
                    backgroundColor: "#343a40",
                    height: "40px",
                    fontSize: "20px",
                  }}
                >
                  {data.category}
                </span>
                <span
                  className="badge text-light mr-2"
                  style={{
                    backgroundColor: "#868e96",
                    height: "40px",
                    fontSize: "20px",
                  }}
                >
                  {data.specialTag}
                </span>
              </div>
              <p style={{ fontSize: "20px" }}>{data.description}</p>
              <div className="row pt-4">
                <div className="col-lg-6">
                  <p>
                    <strong>Author:</strong> {author.name}
                  </p>
                  {category?.map((category: categoryModel) => (
                    <span
                      key={category.id}
                    >
                    <p><strong>Category:</strong> {category.name}</p>
                    </span>
                  ))}
                  <p>
                    <strong>Created At:</strong> {data.createdAt}
                  </p>
                  <p>
                    <strong>Created By:</strong> {data.createdBy}
                  </p>
                </div>
              </div>
              <Link to="/" className="btn btn-outline-dark mt-4">
                Back to Home
              </Link>
            </>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default withAuth(BookDetails);