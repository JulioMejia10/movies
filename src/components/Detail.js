import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Config from '../config/config.json';
import { moviesList } from '../clientRequest/httpServer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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
    const getDetail = this.state.data.filter(item => {
      return Number(item.id) === Number(this.props.id)
    });
    let findFavorite = this.props.movies.dataWithCheck.find((item) => {
      return item.id === this.props.movies.id;
    })

    const deatilToShow = getDetail.map((item) => {
      return (
        <div key={item.id} className="">
          {findFavorite.check && <span className="favorite">this is your favorite movie</span>}
          {findFavorite.check && <FontAwesomeIcon icon={faCheckCircle} />}

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
  movies: PropTypes.object.isRequired,
}

const mapStateToProps = ({ movies }) => ({ movies });

export default connect(mapStateToProps, null)(Detail);
