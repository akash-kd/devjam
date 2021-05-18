
//Router 
import {Route,BrowserRouter as Router } from 'react-router-dom';

// Pages
import Home from './pages/index';
import Main from './pages/main';


function App() {
  return (
    <div>
    <Router>
      <Route path='/' exact component={Home} ></Route>
      <Route path='/app' component={Main}></Route>
    </Router>
    <div>
  );
}

export default App;
