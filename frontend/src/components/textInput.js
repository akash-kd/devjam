//tailwind & css
import '../styles/tailwind.css';
import '../styles/main.css';

function TextInput(props) {
    return (
        <input
            className="shadow-md bg-gray-700 border-2 border-indigo-600 rounded-md w-full py-2 px-2 text-white leading-tight outline-none"
            name="email"
            type="text"
            required
            autoFocus
            placeholder={props.placeholder}
        />
    );
}


TextInput.defaultProps = {
    placeholder:"Type Here  "
}

export default TextInput;