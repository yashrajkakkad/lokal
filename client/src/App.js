import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
} from "react-router-dom";

import Login from "./containers/Login";
import Signup from "./containers/Signup"
import SelectShop from "./containers/SelectShop"
import "./App.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/selectShop" component={SelectShop} />
                <Redirect to={"/login"} />
            </Switch>
        </Router>
    );
}

export default App;
