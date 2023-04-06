import { useNavigate } from "react-router-dom";
import MainLoader from "../../Components/Common/MainLoader";
import {toast} from "react-toastify"
import { useDeleteCategoriesMutation, useGetCategoriesQuery } from "../../Apis/categoryApi";
import { categoryModel } from "../../Interfaces";

function CategoryList() {
  const [deleteCategories] = useDeleteCategoriesMutation();
  const { data, isLoading } = useGetCategoriesQuery(null);
  const navigate = useNavigate();

  const handleCategoryDelete = async (id: number) => {
    toast.promise(
      deleteCategories(id),
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

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-black mb-0">Category List</h1>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/category/categorycreateedit")}
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
                  <th scope="col">Priority</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((category: categoryModel) => {
                  return (
                    <tr key={category.id}>
                      <th scope="row">{category.id}</th>
                      <td>{category.name}</td>
                      <td>{category.priority}</td>
                      <td>{category.createdAt}</td>
                      <td>{category.createdBy}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            navigate(
                              "/category/categorycreateedit/" + category.id
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handleCategoryDelete(category.id)}
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

export default CategoryList;
