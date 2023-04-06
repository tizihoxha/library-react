import { useNavigate, useParams } from "react-router-dom";
import { userModel } from "../../Interfaces";
import { RootState } from "../../Storage/Redux/store";
import { useEffect, useState } from "react";
import { useCreateBooksMutation, useGetBookByIdQuery, useUpdateBooksMutation } from "../../Apis/bookApi";
import { useGetAuthorsQuery } from "../../Apis/authorApi";
import { useGetCategoriesQuery } from "../../Apis/categoryApi";
import { inputHelper, toastNotify } from "../../Helper";
import MainLoader from "../../Components/Common/MainLoader";
import { withAuth } from "../../HOC";
import ReactSelect from "react-select";
import { useSelector } from "react-redux";


const bookData = {
  name: "",
  description: "",
  authorId: "",
  categoryId: [] as string[],
  createdBy: "",
};

function BookCreateEdit() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { id } = useParams();

  const navigate = useNavigate();
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [bookInputs, setBookInputs] = useState(bookData);
  const [loading, setLoading] = useState(false);
  const [createBook] = useCreateBooksMutation();
  const [updateBook] = useUpdateBooksMutation();
  const { data } = useGetBookByIdQuery(id);
  const {data: authors} = useGetAuthorsQuery(null);
  const {data: categories} = useGetCategoriesQuery(null);

  console.log(data)

  useEffect(() => {
    if (data) {
      const tempData = {
        name: data.name,
        description: data.description,
        authorId: data.authorId,
        categoryId: Array.isArray(data.categoryId)
          ? data.result.categoryId
          : [],
        createdBy: userData.fullName || "null",
      };
      setBookInputs(tempData);
      setImageToDisplay(data.image);
    }
  }, [data]);

  const handleBookInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, bookInputs);
    setBookInputs(tempData);
  };
  const handleCategoryChange = (selectedOptions: any) => {
    setBookInputs({
      ...bookInputs,
      categoryId: selectedOptions.map((option: any) => option.value),
    });
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File Must be less then 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File Must be in jpeg, jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("Name", bookInputs.name);
    formData.append("Description", bookInputs.description);
    formData.append("AuthorId", bookInputs.authorId);

    formData.append("CreatedBy", userData.fullName || "null");
    if (imageToDisplay) formData.append("File", imageToStore);
    if (Array.isArray(bookInputs.categoryId)) {
      bookInputs.categoryId.forEach((categoriId) => {
        formData.append("CategoryId", categoriId);
      });
    }

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateBook({ data: formData, id });
      toastNotify("Book updated", "success");
    } else {
      //create
      response = await createBook(formData);
      toastNotify("Book created ", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/book/bookl");
    }

    setLoading(false);
  };
  
  const categoryOptions = categories?.map((category: any) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="container mt-5 p-5">
    {loading && <MainLoader />}
    <h3>{id ? "Edit Book" : "Add Book"}</h3>
    <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="row mt-3">
        <div className="col-md-7">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            required
            id="name"
            name="name"
            value={bookInputs.name}
            onChange={handleBookInput}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            placeholder="Enter Description"
            id="description"
            name="description"
            rows={10}
            value={bookInputs.description}
            onChange={handleBookInput}
          ></textarea>
          <label htmlFor="authorId">Author:</label>
          <select
            className="form-control"
            id="authorId"
            name="authorId"
            value={bookInputs.authorId}
            onChange={handleBookInput}
            required
          >
            <option value="">Select Author</option>
            {authors?.result.map((author: any) => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
          <label htmlFor="categoryId">Category:</label>
          <ReactSelect
              className="mt-3"
              isMulti
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={bookInputs.categoryId.map((id: string) =>
                categoryOptions.find((option: any) => option.value === id)
              )}
            />
            <input type="file"
            onChange={handleFileChange}
            className="form-control mt-e"/>
          <div className="mt-3 d-flex">
            <button
              type="submit"
              className="btn btn-primary mr-3"
            >
              {id ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/book/bookl")}
              className="btn btn-outline-secondary btn-sm mx-2"
            >
              Back to Books
            </button>
          </div>
        </div>
        <div className="col-md-5 text-center">
          <></>
          <img
            src={imageToDisplay}
            style={{ width: "75%", marginTop: "15px" }}
            alt=""
          />
        </div>
      </div> 
    </form>
  </div>
  

  );
}

export default withAuth(BookCreateEdit);
