import { FunctionComponent, ReactElement } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Footer from "./footer/Footer";
import Navigation from "./navigation/Navigation";
import Home from "./pages/Home";

const Router: FunctionComponent = (): ReactElement => {
    return (
        <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          {/* <Route
            exact
            path="/addMovie/:p1?"
            component={AddMovie}
          />
            <Route
            exact
            path="/updateMovie/:p1?"
            component={UpdateMovie}
          />
          <Route
            exact
            path="/deleteMovie/:p1?"
            component={DeleteMovie}
          />
            <Route
            exact
            path="/login"
            component={Login}
          />
            <Route
            exact
            path="/register"
            component={Register}
          />
          <Route exact path="/notFound" component={NotFound} />
          <Route exact path="/unauthorised" component={Unauthorised} /> */}
        </Switch>
        <Footer />
      </BrowserRouter>
    );
};

export default Router;