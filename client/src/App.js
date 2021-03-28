import { Provider } from "react-redux";
import {
    BrowserRouter as Router,

    Redirect,
    Route, Switch
} from "react-router-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import "./App.css";
import Login from "./containers/Login";
import OwnerSelectShop from "./containers/OwnerSelectShop";
import OwnerShop from "./containers/OwnerShop";
import SelectShop from "./containers/SelectShop";
import Signup from "./containers/Signup";
import UserProfile from "./containers/UserProfile";
import UserShop from "./containers/UserShop";
import authReducer from "./store/reducers/auth";


const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/selectShop" component={SelectShop} />
                    <Route path="/userShop" component={UserShop} />
                    <Route path="/ownerShop" component={OwnerShop} />
                    <Route exact path="/userProfile" component={UserProfile} />
                    <Route
                        exact
                        path="/ownerSelectShop"
                        component={OwnerSelectShop}
                    />
                    <Redirect to={"/login"} />
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
