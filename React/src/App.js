import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./shared/pages/Home";
import Users from "./user/pages/Users";
import NewItem from "./items/pages/NewItem";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserItems from "./items/pages/UserItems";
import UpdateItem from "./items/pages/UpdateItem";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/Context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/:userId/items" exact>
          <UserItems />
        </Route>
        <Route path="/items/new" exact>
          <NewItem />
        </Route>
        <Route path="/items/:itemId" exact>
          <UpdateItem />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Auth />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
