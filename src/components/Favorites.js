import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Config from '../config/config.json';

const InfoDetail = (props) => {
  let baseUrl = Config.base_url;
  const favorites = props.data.filter((item) => {
    return item.check == true;
  })
  const dataOfMovies = favorites.map((item) => {
    return (
      <div className="card" key={item.id}>
        <div className="image-container">
          <img src={`${baseUrl}${item.poster_path}`}></img>
        </div>
        <p>name: {item.title}</p>
        <p>puntuation:{item.vote_average}</p>
      </div>
    );
  })

  return (
    <div>
      {dataOfMovies}
    </div>
  );
}

class Favorites extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let fav = this.props.movies.dataWithCheck ? true : false;
    let findFavorite = false;

    if (fav) {
      findFavorite = this.props.movies.dataWithCheck.find((item) => {
        return item.check === true;
      })
    }

    return (<div>
      {fav && findFavorite ? <InfoDetail data={this.props.movies.dataWithCheck} /> : 'nada'}
    </div>)
  }
}
Favorites.propTypes = {
  movies: PropTypes.object.isRequired,
}

const mapStateToProps = ({ movies }) => ({ movies });
export default connect(mapStateToProps, null)(Favorites);