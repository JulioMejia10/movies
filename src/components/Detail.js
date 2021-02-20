import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMoviesFavoritesSelector, isFavoriteSelector } from '../reducers/movies';
import Config from '../config/config.json';
import { moviesList } from '../clientRequest/httpServer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const result = await moviesList();
    this.setState({ data: result.results });
  }

  render() {
    const deatilToShow = this.props.favorites.map((item) => {
      return (
        <div key={item.id} className="">
          {this.props.isFavorite.check && <span className="favorite">this is your favorite movie</span>}
          {this.props.isFavorite.check && <FontAwesomeIcon icon={faStar} />}
          <br />
          <p>More details about</p>
          <strong>{item.title}</strong>
          <div className="col s12 m5">
            <div className="card2">
              <div className="card-image2">
                <img src={`${Config.base_url}${item.poster_path}`} />
                <span className="card-title">{item.overview}</span>
              </div>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="row">
        {deatilToShow}
      </div>
    )
  }
}
Detail.propTypes = {
  favorites: PropTypes.array.isRequired,
  isFavorite: PropTypes.object.isRequired,
}

const mapStateToProps = (store) => (
  {
    favorites: getMoviesFavoritesSelector(store.movies.dataWithCheck, store.movies.id),
    isFavorite: isFavoriteSelector(store.movies.dataWithCheck, store.movies.id)
  }
);

export default connect(mapStateToProps, null)(Detail);
