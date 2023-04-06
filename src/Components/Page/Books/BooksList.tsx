import React from 'react';
import { useState, useEffect } from 'react';
import BooksCard from './BooksCard';

import { useDispatch } from "react-redux";
import { setBook } from '../../../Storage/Redux/bookSlice';
import { useGetBooksQuery } from '../../../Apis/bookApi';
import { bookModel } from '../../../Interfaces/bookModel';


function BooksList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetBooksQuery(null);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setBook(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container row'>
      {data && data.result && data.result.length > 0 &&
        data.result.map((book: bookModel, index: number) => (
          <BooksCard book={book} key={index} />
        ))}
    </div>
  );
}

export default BooksList;
