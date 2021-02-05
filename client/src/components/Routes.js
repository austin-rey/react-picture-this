import React, {useContext,useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { SessionContext, getSessionCookie, setSessionCookie } from "../util/session";
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import ColorSet from '../pages/ColorSet'
import Header from './Header'
import Footer from './Footer'

const history = createBrowserHistory();

const ProtectedHandler = ({ history }) => {
    const session = useContext(SessionContext);

    if (session === undefined) {
      history.push("/login");
    }
    return null;
};

const Routes = () => {

    const [session, setSession] = useState(getSessionCookie());

    useEffect(
      () => {
        setSession(getSessionCookie());
      },
      [session]
    );

    return (
        <SessionContext.Provider value={session}>
            <Router history={history}>
                <Header history={history}/>
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/sets' component={Home}/>
                    <Route exact path='/set/:id' component={ColorSet}/>
                    <Route exact path="*" component={ProtectedHandler}/>
                </Switch>
                <Footer/>
            </Router>
        </SessionContext.Provider>
    )
}

export default Routes
