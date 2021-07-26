import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
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
      <div>
        <Header />
        <Sider />
      </div>
    );
  } else {
    return (
      <div>
        <Switch>
          <Route path="/" exact><Login /></Route>
          {/* <Route path="/login" exact><Login /></Route> */}
          <Route path="/register" exact><Register /></Route>
          <Route path="*" exact><NotFound /></Route>
        </Switch>
      </div>
    );
  }

};


export default App;