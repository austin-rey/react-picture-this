import React, {useContext,useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch,useHistory,Redirect } from 'react-router-dom'
import AuthState from '../context/authState'
import AuthContext from '../context/authContext';
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import ColorSet from '../pages/ColorSet'
import Header from './Header'
import Footer from './Footer'


const ProtectedHandler = ({ history }) => {
    const session = useContext(AuthContext);

    if (session === undefined) {
      history.push("/login");
    }
    return null;
};

const Routes = () => {

    let history = useHistory();

    return (
        <AuthState>
            <Router history={history}>
                <Header history={history}/>
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/sets' component={Home}/>
                    <Route exact path='/set/:id' component={ColorSet}/>
                    <Redirect to='/' />
                </Switch>
                <Footer/>
            </Router>
        </AuthState>
    )
}

export default Routes
