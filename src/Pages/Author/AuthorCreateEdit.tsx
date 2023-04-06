import { useSelector } from "react-redux";
import { userModel } from "../../Interfaces";
import { RootState } from "../../Storage/Redux/store";
import { useEffect, useState } from "react";
import { useCreateAuthorsMutation, useGetAuthorsByIdQuery, useUpdateAuthorsMutation } from "../../Apis/authorApi";
import { useParams, useNavigate } from "react-router-dom";
import { inputHelper, toastNotify } from "../../Helper";
import { withAdminAuth } from "../../HOC";


const authorData = {
  name: "",
  bio: "",
  createdBy: "",
};

function AuthorCreateEdit() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const [authorInput, setAuthorInput] = useState(authorData);
  const [loading, setLoading] = useState(false);
  const [createAuthor] = useCreateAuthorsMutation();
  const [updateAuthor] = useUpdateAuthorsMutation();
  const { data } = useGetAuthorsByIdQuery(id);
  useEffect(() => {
    if (data) {
      const tempData = {
        name: data.name,
        bio: data.bio,
        createdBy: userData.fullName || "null",
      };
      setAuthorInput(tempData);
    }
  }, [data]);

  const handleAuthorInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, authorInput);
    setAuthorInput(tempData);
    setLoading(true);

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Name", authorInput.name);
    formData.append("Bio", authorInput.bio);
    formData.append("CreatedBy", userData.fullName || "null");

    let response;
    if (id) {
      formData.append("Id", id);
      response = await updateAuthor({ data: formData, id });
      toastNotify("Author updated", "success");
    } else {
      response = await createAuthor(formData);
      toastNotify("Author created", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/author/authorlist");
    }

    setLoading(false);
  };
  return (
    <div className="container my-5 py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4" style={{ backgroundColor: "#fff" }}>
              <h3 className="text-center mb-4">
                {id ? "Edit Author" : "Add Author"}
              </h3>
              <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                    required
                    name="name"
                    value={authorInput.name}
                    onChange={handleAuthorInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio" className="form-label">
                    Bio:
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Enter Bio (max 250 characters)"
                    name="bio"
                    rows={5}
                    value={authorInput.bio}
                    onChange={handleAuthorInput}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button type="submit" className="btn btn-primary mx-2">
                    {id ? "Update" : "Create"}
                  </button>
                  <a
                    onClick={() => navigate("/author/authorlist")}
                    className="btn btn-outline-secondary mx-2"
                  >
                    Back to Authors
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

export default withAdminAuth(AuthorCreateEdit);
