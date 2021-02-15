import React from 'react';
import Config from '../config/config.json';
import '../App.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataOfMovies: [] };
  }

  render() {
    let baseUrl = Config.base_url;
    let dataMovies = this.props.dataMovies;

    return (
      <div>
        <div className="wrapper">
          <div className="card" key={dataMovies.id}>
            <div className="image-container">
              <img src={`${baseUrl}${dataMovies.poster_path}`}></img>
            </div>
            <p>{dataMovies.title}</p>
            <p>{dataMovies.vote_average}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default List;