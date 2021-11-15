import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/client/Home';
import Channel from './components/admin/Admin';
import History from './components/client/History';
import Favorite from './components/client/Favorite';
import Register from "./components/register/Register";
import EditChannel from "./components/admin/EditChannel";
import ForgotPassword from "./components/register/ForgotPassword";

function App(){
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Login}/>
          <Route exact path={"/login"} component={Login }/>
          <Route exact path={"/client"} component={Home}/>
          <Route exact path={"/admin"} component={Channel}/>
          <Route exact path={"/history"} component={History}/>
          <Route exact path={"/favorite"} component={Favorite}/>
          <Route exact path={"/register"} component={Register}/>
          <Route exact path={"/forgot"} component={ForgotPassword}/>
          <Route exact path={"/editChannel"} component={EditChannel}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
