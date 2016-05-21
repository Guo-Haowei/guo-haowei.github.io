var Sound = function() {
    var _audios = {};
    
    this.init = function() {
        _audios['use_door'] = new Audio("assets/audio/a_use_door.wav");
    };
    
    this.playAudioByName = function(name) {
        if (name in _audios)
            _audios[name].play();
    };
    
};