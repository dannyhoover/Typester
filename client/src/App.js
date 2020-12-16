import { useState, useEffect  } from "react";
import { Redirect, Route, Switch, NavLink } from "react-router-dom";
// import for Login

import {UserContext} from "./contexts";

import Header from "./components/Header";

import {IndexPage, TestPage} from "./pages";

import API from "./util/API";

import "./App.css";

// function LoginModalState() {
//   const tempState;

//   const [modalstate, setModalState] = useState(false);
// }

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user}}>
      <Header>
        <NavLink className="nav-link" to="/test" exact>Test</NavLink>
      </Header>
      <div className="container mt-5">
        <Switch>
          <Route path="/" exact>
            <IndexPage />
          </Route>
          <Route path="/test" exact>
            <TestPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
