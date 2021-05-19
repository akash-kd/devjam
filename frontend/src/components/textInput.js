//tailwind & css
import '../styles/tailwind.css'
import '../styles/main.css'

function TextInput(props) {
  return <input class='shadow-md bg-gray-700 border-2 border-indigo-600 rounded-md w-full py-2 px-2 text-white-200 leading-tight outline-none' type='text' required autofocus placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
}

TextInput.defaultProps = {
  placeholder: 'Type Here  ',
}

export default TextInput
