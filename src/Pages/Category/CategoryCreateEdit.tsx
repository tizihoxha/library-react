import { useSelector } from "react-redux";
import { userModel } from "../../Interfaces";
import { RootState } from "../../Storage/Redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateCategoriesMutation, useGetCategoriesByIdQuery, useUpdateCategoriesMutation } from "../../Apis/categoryApi";
import { inputHelper, toastNotify } from "../../Helper";


const categoryData = {
  name: "",
  priority: "",

};

function CategoryCreateEdit() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryInput, setCategoryInput] = useState(categoryData);
  const [loading, setLoading] = useState(false);
  const [createCategory] = useCreateCategoriesMutation();
  const [updateCategory] = useUpdateCategoriesMutation();
  const { data } = useGetCategoriesByIdQuery(id);
  useEffect(() => {

    if (data ) {
      const tempData = {
        name: data.name,
        priority: data.priority,
      };
      setCategoryInput(tempData);
    }
  }, [data]);
  

  const handleCategoryInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, categoryInput);
    setCategoryInput(tempData);
    setLoading(true);

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Name", categoryInput.name);
    formData.append("Priority", categoryInput.priority);
    formData.append("CreatedBy", userData.fullName || "null");

    let response;
    if(id){
        formData.append("Id", id);
        response = await updateCategory({data: formData, id});
        toastNotify("Category updated", "success");
    }
    else{
      response = await createCategory(formData);
      toastNotify("Category created", "success");
    }
   
    if (response) {
      setLoading(false);
      navigate("/category/categorylist");
    }

    setLoading(false);
  };
  return (
    <div className="container my-5 py-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body p-4">
            <h3 className="text-center mb-4">{id ? "Edit Category" : "Add Category"}</h3>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="name" className="text-secondary mb-2">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Name"
                  required
                  name="name"
                  value={categoryInput.name}
                  onChange={handleCategoryInput}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="priority" className="text-secondary mb-2">Priority:</label>
                <input
                  type="text"
                  className="form-control"
                  id="priority"
                  placeholder="Enter Priority"
                  required
                  name="priority"
                  value={categoryInput.priority}
                  onChange={handleCategoryInput}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary mt-4 mx-2"
                >
                  {id ? "Update" : "Create"}
                </button>
                <a
                  onClick={() => navigate("/category/categorylist")}
                  className="btn btn-outline-secondary mt-4 mx-2"
                >
                  Back to Categories
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
  
}

export default CategoryCreateEdit;
