//tailwind & css
import '../styles/tailwind.css';
import '../styles/main.css';

function Button(props) {
    return (

        <a href = '/'class={'flex shadow-md items-center justify-center text-white p-1 px-4 mx-4 text-center border-2 rounded-md border-indigo-600' + (props.onlyOutline ? ' ' : ' bg-indigo-500') + (props.fullWidth ? ' w-full' : ' ')}>
           {props.text} 
           {props.OnlyOutline}
        </a>
    );
}


Button.defaultProps = {
    OnlyOutline:false,
    fullWidth:false,
}

export default Button;