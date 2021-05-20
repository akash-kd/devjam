

//Router 
import {Route,BrowserRouter as Router } from 'react-router-dom';

// Pages
import Home from './pages/index';
import Main from './pages/main';

//Component
import Nav from './components/nav.js'

//tailwind & css
import './styles/tailwind.css';
import './styles/main.css'



function App() {


  return (
    <div className="back flex flex-col h-screen bg-gray-800">
    
    {/*NAV BAR ****************/ }
    <Nav/>


      {/* MAIN BODY ***************************/}
      <div className="flex h-full">
        <Router>
          <Route path='/' exact component={Home} ></Route>
          <Route path='/app' component={Main}></Route>
        </Router>
      </div>
      {/* MAIN BODY ***************************/}
    </div>
  );
}

export default App;
