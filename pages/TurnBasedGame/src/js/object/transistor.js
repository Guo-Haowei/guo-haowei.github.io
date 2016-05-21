var randomBooleanGenerator = function(prob) {
    var rand = Math.random();
    return (rand >= 0 && rand < prob);
};


var Transistor = function(x, y, width, height, handler, newX, newY, roomName, transType) {
    var _x = x;
    var _y = y;
    var _width = width;
    var _height = height;
    var _newX = newX;
    var _newY = newY;
    var _roomName = roomName;

    var _handler = handler;

    var _transType = transType;

    var _destroyed = false;

    this.isPlayerOn = function() {
        var player = _handler.getPlayer();
        var playerX = player.getX(), playerY = player.getY();
        return ((playerX < _x + _width) && (playerX + 48 > _x) && (playerY < _y + _height) && (48 + playerY > _y));
    };

    this.changeRoom = function() {
        // disable key board
        _handler.getKeyManager().disable();
        _handler.getGameState().pause();

        // start roomTransitionAlarm
        var alarm = _handler.getAlarmByName('roomTransition');
        alarm.setTransistor(this);
        alarm.start();
    };

    this.changeBattle = function() {
        _handler.getGameState().pause();

        // set next room
        var gameState = _handler.getGameState();
        gameState.setNextRoom(gameState.getCurrentRoom());

        // start battleTransitionAlarm
        var alarm = _handler.getAlarmByName('battleTransition');
        alarm.setTransistor(this);
        alarm.start();
    };

    this.update = function() {
        if (!this.isPlayerOn() || _destroyed)
            return;
        if (_transType === TRANSITION.ROOM)
            this.changeRoom();
        else if (_transType === TRANSITION.BATTLE)
            this.changeBattle();
    };

    this.renderMask = function(ctx) {
        var xOffset = _handler.getCamera().getXOffset(),
            yOffset = _handler.getCamera().getYOffset();
        ctx.fillStyle = 'black';
        ctx.fillRect(_x-xOffset, _y-yOffset, _width, _height);
    };

    this.getNewPos = function() {
        return {
            x: _newX,
            y: _newY
        };
    };

    this.getRoomName = function() {
        return _roomName;
    };

    this.setDestroyed = function(bool) {
        _destroyed = bool;
    };
};