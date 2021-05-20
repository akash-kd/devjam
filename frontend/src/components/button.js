
//tailwind & css

import '../styles/tailwind.css';
import '../styles/main.css';

function Button(props) {
    return (

        <a href={props.href} className={'shadow-md items-center justify-center text-white p-1 px-4 mx-2 text-center border-2 rounded-md border-indigo-600' + (props.onlyOutline ? ' ' : ' bg-indigo-500') + (props.fullWidth ? ' w-full' : ' ')}>
           {props.text} 
           {props.OnlyOutline}
        </a>
    );
}


Button.defaultProps = {
    OnlyOutline:false,
    fullWidth:false,
    href:'/'
}

export default Button;