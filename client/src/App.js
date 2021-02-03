import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Home from './pages/Home'
import ColorSet from './pages/ColorSet'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="root bg-gray-100">
      <Header/>
      <Router>
        <Route exact path='/'>
          <Landing/>
        </Route>
        <Route exact path='/login'>
          <Login/>
        </Route>
        <Route exact path='/sets'>
          <Home/>
        </Route>
        <Route exact path='/set/:id'>
          <ColorSet/>
        </Route>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
