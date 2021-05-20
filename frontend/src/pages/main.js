//COmponent
import Youtube from '../components/youtube.js';
import Chatbox from '../components/chatbox.js'


function Main() {
  return (
      <div className="flex flex-row items-center p-10 w-full">
        <Youtube/>
        <Chatbox/>
      </div>
  );
}

export default Main;