//tailwind & css
import '../styles/tailwind.css'
import '../styles/main.css'

//Components
import Textinput from '../components/textInput.js'
import Chatbit from '../components/chatbit.js'
import { useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import StateContext from '../StateContext'
import Button from './button'

function Chatbox({ socket }) {
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    chatMessage: [],
    textField: '',
  })

  function updateField(e) {
    const value = e.target.value
    setState(draft => {
      draft.textField = value
    })
  }

  function handleSubmit(e) {
    console.log(state.textField)
    e.preventDefault()
    //sending message to server
    if (state.textField) socket.emit('chatSend', state.textField)
    //making the textField empty after sending
    setState(draft => {
      draft.chatMessage.push({ text: state.textField, name: appState.user.username })
      draft.textField = ''
    })
  }

  useEffect(() => {
    socket.on('chatReceive', ({ name, message }) => {
      console.log(name, message)
      setState(draft => {
        draft.chatMessage.push({ text: message, name })
      })
    })

    socket.on('userJoin', name => {
      //   console.log(`${name} has joined the room!</div>`)
      //add message to state collection of message
      setState(draft => {
        draft.chatMessage.push({ text: `${name} has joined the room!` })
      })
    })

    socket.on('userLeave', name => {
      //   console.log(`${name} has left the room!</div>`)
      setState(draft => {
        draft.chatMessage.push({ text: `${name} has left the room!` })
      })
    })
  }, [])
  return (
    <div className='chatbox flex flex-col w-full ml-3 p-3 bg-gray-900 items-center'>
      <a className='text-lg underline'>Chat</a>

      <div className='flex flex-col flex-grow w-full overflow-y-auto'>
        {state.chatMessage.map(({ text, name }, index) => {
          return (
            <div key={index}>
              <Chatbit name={name} text={text} />
            </div>
          )
        })}
      </div>
      <form>
        <Textinput value={state.textField} onChange={e => updateField(e)} placeholder='Type your message here' />
        <Button type='submit' text='Send' onClick={handleSubmit} />
      </form>
    </div>
  )
}

Chatbox.defaultProps = {}

export default Chatbox
