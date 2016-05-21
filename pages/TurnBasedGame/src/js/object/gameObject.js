var StaticGameObject = function(x, y, handler, sprite) {
    var _x = x;
    var _y = y;
    var _handler = handler;
    var _sprite = sprite;

    this.update = function() {

    };

    this.render = function(ctx) {
        var xOffset = _handler.getCamera().getXOffset(),
            yOffset = _handler.getCamera().getYOffset();
        _sprite.draw(ctx, _x-xOffset, _y-yOffset);
    };
};

var BackgroundObject = function(x, y, sprite, repeat) {
    var _x = x;
    var _y = y;
    var _sprite = sprite;
    var _width = sprite.width;
    var _height = sprite.height;
    var _repeat = (typeof repeat === 'undefined'?0:repeat);

    this.render = function(ctx) {
        for (var i = 0; i <= _repeat; ++i) {
            _sprite.draw(ctx, _x + _width*i, _y);
        }
    };

    // getters and setters
    this.approachX = function(dest, speed) {
        if (_width + _x > dest) {
            _x -= (_width + _x - dest)/speed;
        }
    };

    this.approachY = function(destY, speed) {
        if (_y > destY) {
            _y -= (_y - destY)/speed;
            if (_y < destY)
                _y = destY;
        } else if (_y < destY) {
            _y += (destY - _y)/speed;
            if (_y > destY)
                _y = destY;
        }
    };

    this.getWidth = function() {
        return _sprite.width;
    };

    this.getHeight = function() {
        return _sprite.height;
    };

    this.setXY = function(x, y) {
        _x = x;
        _y = y;
    };
};

var DynamicGameObject = function(x, y, handler, spriteList, animationSpeed, needCamera, destroyAfterCycle) {
    var _x = x;
    var _y = y;
    var _handler = handler;
    var _spriteList = spriteList;

    var _needCamera = (typeof needCamera === 'undefined'?true:needCamera);

    var _animationSpeed = (typeof animationSpeed === 'undefined'?6:animationSpeed);

    var _animation = new Animation(_animationSpeed, spriteList);

    var _needCamera = true;

    var _destroyedAfterCycle = (typeof destroyAfterCycle === 'undefined'?false:destroyAfterCycle);

    var _destroyed = false;

    this.update = function() {
        _animation.update();
    };

    this.destroy = function() {
        if (_animation.spriteLength === _animation.index+1)
            _destroyed === true;
    };

    this.render = function(ctx) {
        var xOffset = _needCamera?_handler.getCamera().getXOffset():0,
            yOffset = _needCamera?_handler.getCamera().getYOffset():0;
        _animation.getFrame().draw(ctx, _x-xOffset, _y-yOffset);
    };
};