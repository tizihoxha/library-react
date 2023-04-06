import { useNavigate } from "react-router-dom";
import { useDeleteAuthorsMutation, useGetAuthorsQuery } from "../../Apis/authorApi";
import MainLoader from "../../Components/Common/MainLoader";
import { authorModel } from "../../Interfaces";
import {toast} from "react-toastify"

function AuthorList() {
  const [deleteAuthors] = useDeleteAuthorsMutation();
  const { data, isLoading } = useGetAuthorsQuery(null);
  const navigate = useNavigate();

  const handleAuthorDelete = async (id: number) => {
    toast.promise(
      deleteAuthors(id),
      {
        pending: "Processing your request...",
        success: "Category Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  console.log(data);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-black mb-0">Author List</h1>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/author/authorcreateedit")}
            >
              Add New
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Bio</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.result.map((author: authorModel) => {
                  return (
                    <tr key={author.id}>
                      <th scope="row">{author.id}</th>
                      <td>{author.name}</td>
                      <td>{author.bio}</td>
                      <td>{author.createdAt}</td>
                      <td>{author.createdBy}</td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              navigate(
                                "/author/authorcreateedit/" + author.id
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => handleAuthorDelete(author.id)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
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

export default AuthorList;
