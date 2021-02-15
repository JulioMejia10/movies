import React from 'react';
import Home from './components/Home';
import Detail from './components/Detail';
import { moviesList } from './clientRequest/httpServer';
import 'materialize-css/dist/css/materialize.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
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
    this.state = { dataOfMovies: [] };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const result = await moviesList();
    this.setState({ dataOfMovies: result.results });
  }

  render() {
    const dataOfMovies = this.state.dataOfMovies.map((item) => {
      return (
        <Link key={item.id} to={`/detail/${item.id}`}>
          <Home movies={item} />
        </Link>
      );
    })

    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/detail/:id">
              <InfoDetail></InfoDetail>
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

export default App;