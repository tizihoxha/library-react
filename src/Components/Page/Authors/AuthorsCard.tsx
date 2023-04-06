import { authorModel } from "../../../Interfaces";


interface Props {
  author: authorModel
}

function AuthorsCard(props: Props) {
  return (
    <div className="container mt-4"style={{ marginBottom: '50px', marginLeft: '150px'}} >
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 mb-5">
          <div className="card border-0 rounded-3 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{props.author.name}</h2>
              <p className="card-text">{props.author.bio}</p>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card border-0 rounded-3 shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-subtitle">Created By:</h5>
                      <p className="card-text">{props.author.createdBy}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card border-0 rounded-3 shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-subtitle">Book Count:</h5>
                      <p className="card-text">{props.author.bookCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorsCard;
