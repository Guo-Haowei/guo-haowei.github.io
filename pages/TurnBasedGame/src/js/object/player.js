var Player = function(x, y, handler) {
    var _x = x;
    var _y = y;
    var _handler = handler;
    var _speed = 4;

    var _face = DIR.DOWN;
    var _walkAnimation;

    var _paused = false;

    this.init = function() {
        _walkAnimation = [
        new Animation(6, [
            _handler.getAssetByName('elizabeth_walk_up_0'),
            _handler.getAssetByName('elizabeth_walk_up_1'),
            _handler.getAssetByName('elizabeth_walk_up_2'),
            _handler.getAssetByName('elizabeth_walk_up_3')]),
        new Animation(6, [
            _handler.getAssetByName('elizabeth_walk_down_0'),
            _handler.getAssetByName('elizabeth_walk_down_1'),
            _handler.getAssetByName('elizabeth_walk_down_2'),
            _handler.getAssetByName('elizabeth_walk_down_3')]),
        new Animation(6, [
            _handler.getAssetByName('elizabeth_walk_left_0'),
            _handler.getAssetByName('elizabeth_walk_left_1'),
            _handler.getAssetByName('elizabeth_walk_left_2'),
            _handler.getAssetByName('elizabeth_walk_left_3')]),
        new Animation(6, [
            _handler.getAssetByName('elizabeth_walk_right_0'),
            _handler.getAssetByName('elizabeth_walk_right_1'),
            _handler.getAssetByName('elizabeth_walk_right_2'),
            _handler.getAssetByName('elizabeth_walk_right_3')]),
    ];
    };

    this.update = function() {
        if (_paused)
            return;

        var hspeed = _handler.getKey(KEYCODE.RIGHT)-_handler.getKey(KEYCODE.LEFT);
        var vspeed = _handler.getKey(KEYCODE.DOWN)-_handler.getKey(KEYCODE.UP);

        // check collision
        var row, col;
        if (vspeed !== 0) {
            var tile1, tile2;
            row = vspeed<0?(Math.floor((_y-_speed)/48)):(Math.ceil((_y+_speed)/48));
            col = Math.floor(_x/48);
            tile1 = _handler.getTile(row, col);
            tile2 = _x%48!==0?_handler.getTile(row, col+1):null;
            if ((!tile1 || !tile1.isSolid()) && (!tile2 || !tile2.isSolid()))
                _y += vspeed * _speed;
            _face = vspeed<0?DIR.UP:DIR.DOWN;
            _walkAnimation[_face].update();
        }
        if (hspeed !== 0) {
            var tile1, tile2;
            row = Math.floor(_y/48);
            col = hspeed<0?(Math.floor((_x-_speed)/48)):(Math.ceil((_x+_speed)/48));
            tile1 = _handler.getTile(row, col);
            tile2 = _y%48!==0?_handler.getTile(row+1, col):null;
            if ((!tile1 || !tile1.isSolid()) && (!tile2 || !tile2.isSolid()))
                _x += hspeed * _speed;
            _face = hspeed<0?DIR.LEFT:DIR.RIGHT;
            _walkAnimation[_face].update();
        }
    };

    this.render = function(ctx) {
        var xOffset = _handler.getCamera().getXOffset(),
            yOffset = _handler.getCamera().getYOffset();

        _walkAnimation[_face].getFrame().draw(ctx, _x-xOffset-24, _y-yOffset-36);
    };

    this.renderMask = function(ctx) {
        var xOffset = _handler.getCamera().getXOffset(),
            yOffset = _handler.getCamera().getYOffset();

        _handler.getAssetByName('mask').draw(ctx, _x-xOffset, _y-yOffset);
    };

    this.pause = function() {
        _paused = true;
    };

    this.start = function() {
        _paused = false;
    };

    // getters and setters
    this.getX = function() {
        return _x;
    };

    this.getY = function() {
        return _y;
    };

    this.setX = function(x) {
        _x = x;
    };

    this.setY = function(y) {
        _y = y;
    };
};