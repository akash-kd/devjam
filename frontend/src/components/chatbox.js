
//tailwind & css
import '../styles/tailwind.css';
import '../styles/main.css';

//Components
import Textinput from '../components/textInput.js';
import Chatbit from '../components/chatbit.js'


function Chatbox(props) {
    return (
        <div className="chatbox flex flex-col w-full ml-3 p-3 bg-gray-900 items-center">
            <a className="text-lg underline">Chat</a>

            <div className="flex flex-col flex-grow w-full overflow-y-auto">
                <Chatbit name="Ak" text="Hala Bois" />
                <Chatbit name="dennishotie"   text="Hey!!" />
                <Chatbit name="geeqib"        text="HOla" />
                <Chatbit name="randomeuser"   text="HOla" />
                <Chatbit name="TurboSlayer"   text="HOla" />
                <Chatbit name="IronMerc"      text="HOla" />
                <Chatbit name="DarkCarnage"   text="HOla" />
                <Chatbit name="CrypticHatte"  text="HOla" />
                <Chatbit name="FatalDestiny " text="HOla" />
                <Chatbit name="Venom Fate"    text="HOla" />
                <Chatbit name="Blue Defender" text="HOla" />
            </div>

            <Textinput placeholder="Type your message here"/>
        </div>
    );
}


Chatbox.defaultProps = {
}

export default Chatbox;