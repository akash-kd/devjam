
//tailwind & css
import '../styles/tailwind.css';
import '../styles/main.css';

// Youtube
import YouTube from 'react-youtube';

function Youtube(props) {
    const opts ={
        height: '562',
        width: '1000',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          start:6000
        },
    }
    return (
        // <iframe width="1000" height="562" src="https://www.youtube.com/embed/Q13CishCKXY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <YouTube videoId="J3pF2jkQ4vc" opts={opts} />
    );
}


Youtube.defaultProps = {
}

export default Youtube;