import React, {useState} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import NavBarContext from 'Context';

const AppRouter = () => {

  const [navBar, setNavBar] = useState(1);

  const navBarHandler = (navBar) => {
    setNavBar(navBar);
  }

  return (
    <ThemeProvider>
      <NavBarContext.Provider value=
      {{navBar: navBar,
       onNavBar : navBarHandler
       }}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
      </NavBarContext.Provider>
    </ThemeProvider>
  );
};

export default AppRouter;
