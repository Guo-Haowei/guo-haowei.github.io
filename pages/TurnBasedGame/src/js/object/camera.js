function Camera(x, y) {
    // fields
    var _xOffset = x;
    var _yOffset = y;
    var _target = null;
    
    // methods
    this.getXOffset = function() {
        return Math.floor(_xOffset-SCREEN_WIDTH/2);
    };
    
    this.getYOffset = function() {
        return Math.floor(_yOffset-SCREEN_HEIGHT/2);
    };
    
    this.getActualXOffset = function() {
        return _xOffset;
    };

    this.getActualYOffset = function() {
        return _yOffset;
    };

    this.setOffset = function(x, y) {
        _xOffset = x;
        _yOffset = y;
    };

    this.setOffsetToObj = function(obj) {
        _xOffset = obj.getX();
        _yOffset = obj.getY();
    };
    
    this.update = function() {
        this.followTarget();
    };
    
    this.setTarget = function(obj) {
        _target = obj;
    };
    
    this.followTarget = function() {
        if (_target == null) return;
        var objX = _target.getX(), objY = _target.getY();
        _xOffset += (objX - _xOffset)/40.0;
        _yOffset += (objY - _yOffset)/40.0;
        if (_xOffset <= SCREEN_WIDTH/2) {
            _xOffset = SCREEN_WIDTH/2;
        } else if (_xOffset >= WORLD_WIDTH - SCREEN_WIDTH/2) {
            _xOffset = WORLD_WIDTH - SCREEN_WIDTH/2;
        }
        if (_yOffset <= SCREEN_HEIGHT/2) {
            _yOffset = SCREEN_HEIGHT/2;
        } else if (_yOffset >= WORLD_HEIGHT - SCREEN_HEIGHT/2) {
            _yOffset = WORLD_HEIGHT - SCREEN_HEIGHT/2;
        }
    };
};
