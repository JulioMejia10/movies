import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Home from './components/Home';
import Detail from './components/Detail';
import Favorites from './components/Favorites';
import { moviesList } from './clientRequest/httpServer';
import { setValue } from './actions';
import { alphabetic, numbers, getDataWithCheck } from './helpers';
import 'flexboxgrid';
import './App.css';

const InfoDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <Detail id={id} />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOfMovies: [],
      dataCheckeds: [],
      valueSelect: 'default',
      objectConstants: { nameSelect: 'puntuation' }
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const result = await moviesList();
      this.setState({ dataOfMovies: getDataWithCheck(result) });

    } catch (error) {
      console.log(error);
    }
  }

  handleClick(id) {
    const info = { id, dataWithCheck: this.state.dataOfMovies };
    this.props.setValue(info);
  }

  handleInputChange(id, isFavorite) {
    const dataWithCheck = this.state.dataOfMovies.map((item) => {
      if (item.id === id) {
        return { ...item, check: !isFavorite, name: `check${item.id}` }
      }
      return item;
    });

    this.setState({ dataOfMovies: dataWithCheck });
    const info = { id, dataWithCheck };
    this.props.setValue(info);
  }

  handleChange(e) {
    if (e.target.value === this.state.objectConstants.nameSelect) {
      numbers(this.state.dataOfMovies);
    } else {
      alphabetic(this.state.dataOfMovies);
    }
    this.setState({ valueSelect: e.target.value });
  }

  render() {
    const dataOfMovies = this.state.dataOfMovies.map((item) => {
      return (
        <div key={item.id} >
          <div className="card-parent row center-xs">
            <div className="card-child col-xs-11">
              <div className="box">
                <form>
                  <span className="favorite">add to favorites</span>
                  <input
                    name={item.name}
                    type="checkbox"
                    checked={item.check}
                    onChange={() => this.handleInputChange(item.id, item.check)} />
                  <br />
                  <span className="favorite">Filter by:</span>
                  <select value={this.state.valueSelect} onChange={(e) => this.handleChange(e)}>
                    <option value="default">Default</option>
                    <option value="puntuation">Puntuation</option>
                    <option value="alfa">alfabetic</option>
                  </select>
                </form>
              </div>
              <div className="box">
                <Link to={`/detail/${item.id}`} onClick={() => { this.handleClick(item.id) }}>
                  <Home movies={item} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    })

    return (
      <Router>
        <div className="App">
          <div className="parent row">
            <div className="child col-xs-4">
              <div className="box">
                <Link to="/">Home</Link>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="box">
                <Link to="/favorites">My favorite movies</Link>
              </div>
            </div>
          </div>

          <Switch>
            <Route path="/detail/:id">
              <InfoDetail></InfoDetail>
            </Route>
            <Route path="/favorites">
              <Favorites favorites={this.state.dataOfMovies} />
            </Route>
            <Route path="/">
              {dataOfMovies}
            </Route>
          </Switch>

        </div>
      </Router>
    );
  }
}

App.propTypes = {
  setValue: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setValue: value => dispatch(setValue(value))
});

export default connect(null, mapDispatchToProps)(App);