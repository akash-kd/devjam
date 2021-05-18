//tailwind & css
import '../styles/tailwind.css';
import '../styles/main.css';

function TextInput(props) {
    return (
        <input
        class="shadow-md bg-gray-700 border-2 border-indigo-600 rounded-md w-full py-2 px-2 text-gray-700 leading-tight outline-none"
        name="email"
        type="text"
        required
        autofocus
        placeholder={props.placeholder}
        />
    );
}


TextInput.defaultProps = {
    placeholder:"Type Here  "
}

export default TextInput;