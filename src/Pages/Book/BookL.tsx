import { useNavigate } from "react-router-dom";
import { useDeleteBooksMutation, useGetBooksQuery } from "../../Apis/bookApi";
import {toast} from "react-toastify"
import MainLoader from "../../Components/Common/MainLoader";
import { bookModel } from "../../Interfaces";
import { withAuth } from "../../HOC";

function BookL() {
  const [deleteBook] = useDeleteBooksMutation();
  const { data, isLoading } = useGetBooksQuery(null);
  const navigate = useNavigate();

  const handleBookDelete = async (id: number) => {
    toast.promise(
      deleteBook(id),
      {
        pending: "Processing your request...",
        success: "Book Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
{!isLoading && (
  <div className="table-responsive p-5">
    <div className="d-flex align-items-center justify-content-between">
      <h1 className="text-black mb-0">Book List</h1>
      <button
        className="btn btn-primary btn-md"
        onClick={() => navigate("/book/bookcreateedit")}
      >
        Add New Book
      </button>
    </div>
    <div className="mt-3">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Author ID</th>

            <th scope="col">Created At</th>
            <th scope="col">Created By</th>
          </tr>
        </thead>
        <tbody>
          {data.result.map((book: bookModel) => {
            return (
              <tr key={book.id}>
                <td>
                  <img
                    src={book.image}
                    alt="no content"
                    style={{ width: "100%", maxWidth: "120px" }}
                  />
                </td>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.authorId}</td>
                
                <td>{book.createdAt}</td>
                <td>{book.createdBy}</td>
                <td>
                  <button
                    className="btn btn-primary btn-md"
                    onClick={() => navigate("/book/bookcreateedit/" + book.id)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-md mx-2"
                    onClick={() => handleBookDelete(book.id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
)}

    </>
  );
}

export default withAuth(BookL);
