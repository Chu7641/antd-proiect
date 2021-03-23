import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import PokemonCart from './pages/Cart/PokemonCart';
import Home from "./pages/Home";
import List from './pages/ListData/List';
import Login from "./pages/Login";
import Pokemon from './pages/Pokemon/Pokemon';
import Signup from "./pages/Signup";

function App() {
  return (
   <Router>
       <Switch>
       <Route path="/pokemon">
            <Pokemon/>
          </Route>
       <Route path="/listdata">
            <List/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route> 
          <Route path="/signup">
            <Signup/>
          </Route>
         <Route  path="/">
           <Home/>
          </Route>
        </Switch>
   </Router>
  );
}

export default App;
