import React, { useContext } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Sider } from './Components/Sidebar/Sidebar';
import { AuthContext } from './Contexts/Auth/AuthContext';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import NotFound from './Pages/Content/NotFound/NotFound';


const App = () => {

  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <HashRouter basename="/">
        <Header />
        <Sider />
      </HashRouter>
    )
  } else {
    return (
      <HashRouter basename="/">
        <Switch>
          <Route path="/" exact><Login /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="*"><NotFound /></Route>
        </Switch>
      </HashRouter>
    );
  }

};


export default App;