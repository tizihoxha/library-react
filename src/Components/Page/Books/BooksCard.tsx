import React, { useState, useEffect } from "react";
import { apiResponse, authorModel, bookModel, categoryModel } from "../../../Interfaces";
import { Link } from "react-router-dom";

interface Props {
  book: bookModel;
}

function BooksCard(props: Props) {
  const recommendedBooks = [8, 9, 11];
  const isRecommended = recommendedBooks.includes(props.book.id);

  const [author, setAuthor] = useState<authorModel | null>(null);


  useEffect(() => {
    fetch(
      `https://libraapi.azurewebsites.net/api/Authors/${props.book.authorId}`
    )
      .then((response) => response.json())
      .then((data) => setAuthor(data))
      .catch((error) => console.log(error));
  }, [props.book.authorId]);

  const [categories, setCategories] = useState<categoryModel[]>([]);
  useEffect(() => {
    fetch(
      `https://libraapi.azurewebsites.net/api/Books/books/${props.book.id}/categories`
    )
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, [props.book.id]);

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className={`card h-100 ${isRecommended ? "recommended" : ""}`}
        style={{ border: "none" }}
      >
        {isRecommended && (
          <i
            className="bi bi-star btn btn-success"
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
              backgroundColor: "#007BFF",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            &nbsp; Recommended
          </i>
        )}{" "}
        <Link to={`/bookDetails/${props.book.id}`}>
          <img
            src={props.book.image}
            className="card-img-top"
            alt={props.book.name}
            style={{ width: "110%", height: "550px", objectFit: "cover" }}
          />
        </Link>
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{props.book.name}</h5>
          <p className="card-text">
            <span className="fw-bold">Author:</span>{" "}
            {author ? author.name : "Loading author name..."}
          </p>
          <p className="card-text">
            <span className="fw-bold">Created By:</span> {props.book.createdBy}
          </p>
          {categories.length > 0 && (
            <p className="card-text">
              <span className="fw-bold">Categories:</span>{" "}
              {categories.map((category) => category.name).join(", ")}
            </p>
          )}
        </div>
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div className="text-secondary">
            {new Date(props.book.createdAt).toLocaleDateString()}
          </div>
          <div className="btn-group">
            <Link to={`/bookDetails/${props.book.id}`}>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary view-button"
                style={{ backgroundColor: "#007BFF", color: "#fff" }}
              >
                <i className="bi bi-eye"></i> View
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksCard;
