import React from 'react';
import Config from '../config/config.json';
import { moviesList } from '../clientRequest/httpServer';

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

    const deatilToShow = getDetail.map((item) => {
      return (
        <div key={item.id} className="col s12 m5">
          <div className="card">
            <div className="card-image">
              <img src={`${Config.base_url}${item.poster_path}`} />
              <span className="card-title">Card Title</span>
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

export default Detail;
