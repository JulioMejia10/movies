import React from 'react';
import List from '../components/List';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <List dataMovies={this.props.movies} />
  }
}

export default Home;

