import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFavorite } from '../reducers/movies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faHeart } from '@fortawesome/free-solid-svg-icons';
import List from '../components/List';
import { getFavorites } from '../helpers';

const InfoDetail = (props) => {
  const favorites = getFavorites(props.data);
  const dataOfMovies = favorites.map((item) => {
    return (
      <div key={item.id}>
        <span className="favorite">Here is your favorite Movies </span>
        <FontAwesomeIcon icon={faHeart} />
        <br />
        <List key={item.id} dataMovies={item} />
      </div>
    );
  })

  return (
    <div>
      {dataOfMovies}
    </div>
  );
}

const Empty = () => {
  return (
    <div>
      <span className="favorite">there aren´t movies in this setion. </span>
      <FontAwesomeIcon icon={faCloud} />
    </div>
  );
}

class Favorites extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
      {this.props.favorite ? <InfoDetail data={this.props.movies.dataWithCheck} /> : <Empty />}
    </div>)
  }
}
Favorites.propTypes = {
  movies: PropTypes.object.isRequired,
}

const mapStateToProps = (store) => (
  {
    movies: store.movies,
    favorite: getFavorite(store.movies.dataWithCheck)
  });
export default connect(mapStateToProps, null)(Favorites);