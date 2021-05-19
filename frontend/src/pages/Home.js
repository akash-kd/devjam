//tailwind & css
import '../styles/tailwind.css';
import '../styles/main.css';

//Components
import TextInput from '../components/textInput.js';
import Button from '../components/button.js'

import { useContext } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import StateContext from '../StateContext'
import UpdateContext from '../UpdateContext'

function Home() {
  const state = useContext(StateContext)
  const setState = useContext(UpdateContext)
  return (
    <div className="flex flex-row w-full py-3 px-12 items-center justify-end">
      <div className="flex flex-col bg-gray-900 h-5/6 w-1/3 p-4 border-2 border-indigo-600 rounded-md items-center justify-center">
        <a className="text-center w-100 text-2xl mt-3 underline"> Join the Room </a>
        <a className="text-center w-100 text-md my-2 opacity-70">Enjoy the vedio with friend losing no Sync !</a>
        <TextInput placeholder="Enter the Room Code"/>
        <a className="text-center w-100 text-xl my-3"> or</a>
        <Button text="Create A Room" fullWidth={true}/>
      </div>
    </div>
  );
}

export default Home
