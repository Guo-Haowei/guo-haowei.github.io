var room_ids = ['ancient_forest', 'blacksmith', 'town'];

// scripts
var roomTransitionAlarmScript = function(handler, alarm) {
    var ticksSoFar = alarm.getTicksSoFar();
    var gameState = handler.getGameState();
    gameState.setTransitioning(TRANSITION.ROOM);
    var alpha = gameState.getAlpha();

    var middlePoint = Math.floor(alarm.getMaxTicks()/2);
    var darkFrame = 5;
    if (ticksSoFar < middlePoint - darkFrame) {
        if (ticksSoFar%2 === 0)
            gameState.changeAlpha(0.06);
    } else if (ticksSoFar === middlePoint) {
        var newPos = alarm.getTransistor().getNewPos();
        // set new X Y
        handler.getPlayer().setX(newPos.x);
        handler.getPlayer().setY(newPos.y);
        // set camera
        handler.getCamera().setOffsetToObj(handler.getPlayer());
        // switch current room
        gameState.setCurrentRoom(alarm.getTransistor().getRoomName());
        // reactivate transistors
        gameState.getRoomByName(alarm.getTransistor().getRoomName()).reactiveTransistors();
        // update room
        gameState.update();
        gameState.start();

    } else if (ticksSoFar > middlePoint + darkFrame) {
        if (ticksSoFar%5 === 0)
            gameState.changeAlpha(-0.15);
    }
    if (ticksSoFar === 10)
        handler.playAudioByName('use_door');

    if (ticksSoFar === alarm.getMaxTicks()) {
        alarm.reset();
        gameState.setTransitioning(TRANSITION.NONE);
        handler.getKeyManager().enable();
    }
};

var battleTransitionAlarmScript = function(handler, alarm, transistor) {
    var ticksSoFar = alarm.getTicksSoFar();
    var gameState = handler.getGameState();
    gameState.setTransitioning(TRANSITION.BATTLE);
    var alpha = gameState.getAlpha();

    if (ticksSoFar === 2) {
        gameState.setAlpha(0.4);
        gameState.getRoomByName('battlefield').reset();
    } else if (ticksSoFar <= 22) {
        gameState.changeAlpha(0.05);
    } else if (ticksSoFar >= 36) {
        gameState.changeAlpha(-0.05);
    }

    if (ticksSoFar === 28) {
        gameState.setCurrentRoom(alarm.getTransistor().getRoomName());
        // update room
        gameState.update();
        gameState.start();
    }

    if (ticksSoFar === alarm.getMaxTicks()) {
        alarm.reset();
        gameState.setTransitioning(TRANSITION.NONE);
        gameState.getRoomByName('battlefield').setState(BATTLE.IDLING);
        handler.getKeyManager().enable();
    }
};

var battleQuitAlarmScript = function(handler, alarm) {
    var ticksSoFar = alarm.getTicksSoFar();
    var gameState = handler.getGameState();
    gameState.setTransitioning(TRANSITION.BATTLE);
    var alpha = gameState.getAlpha();

    if (gameState === 2) {
        gameState.setAlpha(0.4);
    } else if (ticksSoFar <= 22) {
        gameState.changeAlpha(0.05);
    } else if (ticksSoFar >= 36) {
        gameState.changeAlpha(-0.05);
    }

    if (ticksSoFar === 28) {
        handler.getBattlefield().quit(
            handler.getAlarmByName('battleTransition'),
            handler.getGameState());
        gameState.update();
        gameState.start();
    }
    if (ticksSoFar === alarm.getMaxTicks()) {
        alarm.reset();
        gameState.setTransitioning(TRANSITION.NONE);
    }
};

var roomTransistionScript = function(ctx, alpha) {
    ctx.fillStyle = '#000080';
    ctx.globalAlpha = alpha/2;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.fillStyle = 'rgb(10, 10, 10)';
    ctx.globalAlpha = alpha;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.globalAlpha = 1;
};

var battleTransistionScript = function(ctx, alpha) {
    ctx.fillStyle = '#FF7F50';
    ctx.globalAlpha = alpha/2;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = alpha;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.globalAlpha = 1;
};

var GameState = function(handler) {
    var _rooms = {};
    var _currentRoom;
    var _handler = handler;
    var _paused = false;

    // alarms
    var _alarms = {};

    var _transitioning = TRANSITION.NONE;
    var _transitionAlpha = 0.0;

    var _vignette;
    var _nextRoom;

    var _worldUI = new WorldUI(handler);

    this.init = function() {
        _vignette = _handler.getAssetByName('vignette');
        // rooms
        for (var i = 0; i < room_ids.length; ++i) {
            var tempRoom = new Room(_handler);
            tempRoom.init(ROOMS[room_ids[i]]);
            _rooms[room_ids[i]] = tempRoom;
        }
        // battlefield
        var battlefield = new Battlefield(_handler);
        battlefield.init();
        _rooms['battlefield'] = battlefield;

        _currentRoom = 'town';
        // setPlayer
        _rooms[_currentRoom].setPlayer();

        // init room transition alarm
        _alarms['roomTransition'] = new Alarm(70, roomTransitionAlarmScript);
        // init battle transition alarm
        _alarms['battleTransition'] = new Alarm(140, battleTransitionAlarmScript);
        _alarms['battleQuit'] = new Alarm(70, battleQuitAlarmScript);

        _worldUI.init();
    };

    this.update = function() {
        // update alarm
        for (key in _alarms)
            _alarms[key].update(_handler);
        if (_paused)
            return;
        _handler.getCamera().update();
        _rooms[_currentRoom].update();
        _worldUI.update();
    };

    this.render = function(ctx) {
        _rooms[_currentRoom].render(ctx);
        // if (_rooms[_currentRoom].renderMask)
            // _rooms[_currentRoom].renderMask(ctx);

        _vignette.draw(ctx, 0, 0);
        // transition
        if (_transitioning === TRANSITION.ROOM) {
            roomTransistionScript(ctx, _transitionAlpha);
        } else if (_transitioning === TRANSITION.BATTLE) {
            battleTransistionScript(ctx, _transitionAlpha);
        }
        _worldUI.render(ctx);
    };

    this.pause = function() {
        _paused = true;
    };

    this.start = function() {
        _paused = false;
    };

    this.changeAlpha = function(delta) {
        _transitionAlpha += delta;
        if (_transitionAlpha > 1)
            _transitionAlpha = 1;
        if (_transitionAlpha < 0)
            _transitionAlpha = 0;
    };

    // getters and setters

    this.setNextRoom = function(roomName) {
        _nextRoom = roomName;
    };

    this.getNextRoom = function() {
        return _nextRoom;
    };

    this.getAlarmByName = function(name) {
        var alarm = _alarms[name];
        if (typeof alarm !== 'undefined')
            return alarm;
        else
            return null;
    };

    this.setTransitioning = function(transType) {
        _transitioning = transType;
    };

    this.getAlpha = function() {
        return _transitionAlpha;
    };

    this.setAlpha = function(alpha) {
        _transitionAlpha = alpha;
    };

    this.getTile = function(row, col) {
        return _rooms[_currentRoom].getTile(row, col);
    };

    this.setCurrentRoom = function(room) {
        _currentRoom = room;
    };

    this.getCurrentRoom = function() {
        return _currentRoom;
    };

    this.getRoomByName = function(name) {
        return _rooms[name];
    };
};