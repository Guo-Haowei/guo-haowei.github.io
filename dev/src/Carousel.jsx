import { playNextBackgroundImage } from './utilities.js';

const Carousel = () => {
  return (
    <div>
      <div className="w3-display-left">
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" onClick={() => playNextBackgroundImage(-1)}></span>
      </div>
        <div className="w3-display-middle">
          <br />
          <br />
          <div className="w3-center"><img src="Logo.png" id="logo" /></div>
          <br />
          <br />
          <div className="w3-content w3-container" id="about">
            <div className="w3-center" style={{ whiteSpace: 'nowrap', fontSize: '150%', color: 'white' }} id="typedtext"></div>
          </div>
        </div>
        <div className="w3-display-right">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" onClick={() => playNextBackgroundImage(1)}></span>
        </div>
    </div>
  )
};

export default Carousel;