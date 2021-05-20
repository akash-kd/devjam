//Router
import { Route, BrowserRouter as Router } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Main from './pages/main'
import StateContext from './StateContext'
import UpdateContext from './UpdateContext'

//Component
import Nav from './components/nav.js'

//tailwind & css
import './styles/tailwind.css'
import './styles/main.css'

import { useImmer } from 'use-immer'


function App() {
  const [state, setState] = useImmer({
    user: {
      username: '',
      isAdmin: true,
    },
    roomID: '',
  })

  return (
    <div className='flex flex-col h-screen bg-gray-700'>
      <Nav />

      {/* MAIN BODY ***************************/}
      <div className='flex h-full'>
        <StateContext.Provider value={state}>
          <UpdateContext.Provider value={setState}>
            <Router>
              <Route path='/' exact component={Home}></Route>
              <Route path='/app' component={Main}></Route>
            </Router>
          </UpdateContext.Provider>
        </StateContext.Provider>
      </div>
      {/* MAIN BODY ***************************/}
    </div>
  )
}

export default App
