import React from 'react'
import BooksList from '../Components/Page/Books/BooksList';
import Banner from '../Components/Common/Banner';

function Home() {
  return (
    <div>
      <Banner/>
      <div className="container p-2">
        <BooksList />
      </div>
    </div>
  );
}

export default Home;
