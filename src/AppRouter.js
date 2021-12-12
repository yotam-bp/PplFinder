import React, {useState} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import NavBarContext from 'Context';

const AppRouter = () => {

  const [navBarIndex, setNavBarIndex] = useState(0);

  const navBarHandler = (navBarIndex) => {
    setNavBarIndex(navBarIndex);
  }

  return (
    <ThemeProvider>
      <NavBarContext.Provider value=
      {{navBarIndex: navBarIndex,
       onNavBarChange : setNavBarIndex
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
