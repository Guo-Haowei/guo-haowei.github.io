var KeyManager = function() {
    var _keys = new Array(256).fill(BOOL.FALSE);
    var _disabled = false;
    var _mostRecentPressed;

    var _currentKeys = {};
    var _upKeys = {};
    var _downKeys = {};

    document.addEventListener('keydown', function(e) {
        _keys[e.keyCode] = true;
    });

    document.addEventListener('keyup', function(e) {
        _keys[e.keyCode] = false;
    });

    this.update = function() {
        if (_disabled) {
            _upKeys = {};
            _downKeys = {};
            _currentKeys = {};
        }

        _upKeys = {};
        for (var i = 0; i < 256; ++i) {
            if (this.getKey(i) === BOOL.FALSE && (i.toString() in _currentKeys))
                _upKeys[i.toString()] = BOOL.TRUE;
        }

        _downKeys = {};
        for (var i = 0; i < 256; ++i) {
            if (this.getKey(i) === BOOL.TRUE && !(i.toString() in _currentKeys))
                _downKeys[i.toString()] = BOOL.TRUE;
        }

        _currentKeys = {};
        for (var i = 0; i < 256; ++i) {
            if (this.getKey(i) === BOOL.TRUE)
                _currentKeys[i.toString()] = BOOL.TRUE;
        }
    };

    this.getKey = function(keyCode) {
        if (_disabled)
            return BOOL.FALSE;
        return _keys[keyCode]?BOOL.TRUE:BOOL.FALSE;
    }

    this.getKeyUp = function(keyCode) {
        if (_disabled)
            return BOOL.FALSE;
        return (keyCode.toString() in _upKeys)?BOOL.TRUE:BOOL.FALSE;
    }

    this.getKeyDown = function(keyCode) {
        if (_disabled)
            return BOOL.FALSE;
        return (keyCode.toString() in _downKeys)?BOOL.TRUE:BOOL.FALSE;
    }

    this.getMostRecentPressed = function() {
        return _mostRecentPressed;
    }

    this.disable = function() {
        _disabled = true;
    };

    this.enable = function() {
        _disabled = false;
    };
};
