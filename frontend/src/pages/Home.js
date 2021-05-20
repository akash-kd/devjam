//tailwind & css
import '../styles/tailwind.css'
import '../styles/main.css'

//Components
import TextInput from '../components/textInput.js'
import Button from '../components/button.js'

import { useContext } from 'react'
import { Route, BrowserRouter as Router, withRouter, Link } from 'react-router-dom'
import StateContext from '../StateContext'
import UpdateContext from '../UpdateContext'

function Home(props) {
  const state = useContext(StateContext)
  const setState = useContext(UpdateContext)

  return (
    <div className='flex flex-row w-full py-3 px-12 items-center justify-center'>
      <div className='flex flex-col bg-gray-900 h-5/6 w-1/3 p-4 border-2 border-indigo-600 rounded-md items-center justify-center'>
        
      <a className='text-center w-100 text-md my-2 opacity-70'>Enjoy the vedio with friend losing no Sync !</a>

      <TextInput
        value={state.user.username}
        onChange={e =>
          setState(state => {
            state.user.username = e.target.value
          })
        }
        placeholder='Enter your name'
      />

        
      <TextInput
        value={state.roomId}
        onChange={e =>
          setState(state => {
            state.roomId = e.target.value
          })
        }
        placeholder='Enter the Room Code'
      />


        <div className="flex flex-col w-full py-2">

          <Link to={`/app?name=${state.user.isAdmin}&roomId=${state.roomId}`}>
            <Button
              text='Join Room with code'
              onClick={() =>
                setState(state => {
                  state.user.isAdmin = false
                })
              }
              fullWidth={true}
            />
          </Link>


          <a className='text-center w-100 text-xl my-3'> or</a>


          <Link to={`/app?name=${state.user.isAdmin}&roomId=${state.roomId}`}>
            <Button
              onClick={() =>
                setState(state => {
                  state.user.isAdmin = true
                })
              }
              text='Create A Room'
              fullWidth={true}
            />
          </Link>

        </div>

      </div>
    </div>
  )
}

export default withRouter(Home)
