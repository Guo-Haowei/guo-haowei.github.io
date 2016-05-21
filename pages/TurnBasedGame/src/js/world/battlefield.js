var getIndex = function(current, max) {
    if (current === 0)
        return 0;
    else
        return Math.ceil(62*(current/max))-1;
};

var waitForAction = function(current, max, speed) {
    if (current + speed > max)
        return max;
    else
        return current + speed;
};

var BattleZone = function(x, y, handler, parent) {
    var _handler = handler;
    var _x = x;
    var _y = y;
    var _width = 960;
    var _height = 540;

    var _parent = parent;

    var _state = BATTLE.INTRODUCTION;

    var _background = handler.getAssetByName('battle_zone');

    var _elizabeth;
    var _monster;
    var _monsterType;

    var _infoBarSprite = handler.getAssetByName('info_bar');

    this._infoBar1 = {
        x: 220,
        y: 60,
        healthIndex: getIndex(PLAYER.health, PLAYER.maxHealth),
        actionIndex: 0
    };

    this._infoBar2 = {
        x: 770,
        y: 60,
        healthIndex: 61,
        actionIndex: 0
    };

    var _healthBarOffset = {
        x: 9,
        y: 12,
    };

    var _actionBarOffset = {
        x: 9,
        y: 24
    };

    var _levelOffset = {
        x: 15,
        y: 45
    };

    this.reset = function() {
        this._infoBar1.healthIndex = getIndex(PLAYER.health, PLAYER.maxHealth);
        this._infoBar1.actionIndex = 0;

        this._infoBar2.healthIndex = 61;
        this._infoBar2.actionIndex = 0;

        _elizabeth.reset();
        _monster.reset();
    };

    this.init = function() {
        _elizabeth = new ElizabethObject(240, 400, _handler);

        _monster = new Monster(0, 0, _handler);
        _monster.init();
        _monsterType = 'spider';

    };

    this.isFull = function(identity) {
        var index = identity===1?this._infoBar1.actionIndex:this._infoBar2.actionIndex;
        return index >= 61;
    };

    this.doDamage = function(num) {
        if (num === 1 && PLAYER.health > 0)
            --PLAYER.health;
        else if (num === 2 && _monster.health > 0)
            --_monster.health;
    };

    this.heal = function(num) {
        PLAYER.health += num;
        if (PLAYER.maxHealth < PLAYER.health)
            PLAYER.health = PLAYER.maxHealth;
    };

    this.approachX = function(dest, speed) {
        if (_width + _x > dest) {
            _x -= (_width + _x - dest)/speed;
        }
    };

    this.update = function() {
        // idling
        _elizabeth.update();
        _monster.update();
        if (_state === BATTLE.END)
            return;
        this._infoBar1.healthIndex = getIndex(PLAYER.health, PLAYER.maxHealth);
        this._infoBar2.healthIndex = getIndex(_monster.health, _monster.maxHealth);
        if (_state === BATTLE.IDLING && !this.isFull(1) && !this.isFull(2)) {
            this._infoBar1.actionIndex = waitForAction(this._infoBar1.actionIndex, 61, PLAYER.actionMeterSpeed);
            this._infoBar2.actionIndex = waitForAction(this._infoBar2.actionIndex, 61, MONSTERS[_monsterType].actionMeterSpeed);
            if (this.isFull(1)) {
                _handler.getBattlefield().getUI().setDir(-1);
            } else if (this.isFull(2)) {
                _handler.getBattlefield().getBattleZone().getMonster().setActionState(ACTION.APPROACH);
                _handler.getBattlefield().getBattleZone().getMonster().setState(BATTLE.MONSTER_ACTION);
            }
        }
        if (this._infoBar1.healthIndex <= 0) {
            handler.getKeyManager().pause;
            // pause gameState
            handler.getGameState().pause();

            // start alarm
            var alarm = handler.getAlarmByName('battleQuit');
                alarm.start();
            PLAYER.health = 1;
        }
    };

    this.render = function(ctx) {
        // render background
        _background.draw(ctx, _x, _y);
        if (_elizabeth.zIndex < _monster.zIndex) {
            _elizabeth.render(ctx, _x, _y);
            _monster.render(ctx, _x, _y);
        } else {
            _monster.render(ctx, _x, _y);
            _elizabeth.render(ctx, _x, _y);
        }

        // render UI
        _infoBarSprite.draw(ctx, this._infoBar1.x+_x, this._infoBar1.y+_y);
        _infoBarSprite.draw(ctx, this._infoBar2.x+_x, this._infoBar2.y+_y);
        // render health bar
        _handler.getAssets().health_bar[this._infoBar1.healthIndex].draw(ctx, this._infoBar1.x+_x+_healthBarOffset.x, this._infoBar1.y+_y+_healthBarOffset.y);
        _handler.getAssets().health_bar[this._infoBar2.healthIndex].draw(ctx, this._infoBar2.x+_x+_healthBarOffset.x, this._infoBar2.y+_y+_healthBarOffset.y);
        // action bar
        _handler.getAssets().action_meter[Math.round(this._infoBar1.actionIndex)].draw(ctx, this._infoBar1.x+_x+_actionBarOffset.x, this._infoBar1.y+_y+_actionBarOffset.y);
        _handler.getAssets().action_meter[Math.round(this._infoBar2.actionIndex)].draw(ctx, this._infoBar2.x+_x+_actionBarOffset.x, this._infoBar2.y+_y+_actionBarOffset.y);
        // level

        renderText(ctx,
            this._infoBar1.x+_x+_levelOffset.x,
            this._infoBar1.y+_y+_levelOffset.y,
            ('Level  ' + PLAYER.level.toString()),
            _handler);

        renderText(ctx,
            this._infoBar2.x+_x+_levelOffset.x,
            this._infoBar2.y+_y+_levelOffset.y,
            ('Level  ' + _monster.level.toString()),
            _handler);

    };

    this.setXY = function(x, y) {
        _x = x;
        _y = y;
    };

    this.setState = function(state) {
        _state = state;
        _elizabeth.setState(state);
        _monster.setState(state);
    };

    this.getElizabeth = function() {
        return _elizabeth;
    };

    this.getMonster = function() {
        return _monster;
    };
};


var Battlefield = function(handler) {
    var _handler = handler;
    var _backgroundList = new Array(8);

    var _state = BATTLE.INTRODUCTION;

    var _battleZone;

    var _UI;

    var _playerAttackTimer = 0;
    var _playerAttackTimerMax = 60;

    var _quitTimer = 60;

    // images
    this.init = function() {
        _backgroundList[0] = new BackgroundObject(0, -10, _handler.getAssetByName('battle_sky'));
        _backgroundList[1] = new BackgroundObject(0, -10, _handler.getAssetByName('battle_mountain'));
        _backgroundList[2] = new BackgroundObject(0, -20, _handler.getAssetByName('battle_tree_background'));
        _backgroundList[3] = new BackgroundObject(0, -20, _handler.getAssetByName('battle_tree_back'));
        _backgroundList[4] = new BattleZone(540, 0, _handler, this);
        _backgroundList[5] = new BackgroundObject(0, 0, _handler.getAssetByName('battle_grass_front'), 1);
        _backgroundList[6] = new BackgroundObject(840, 0, _handler.getAssetByName('battle_foreground'));
        _backgroundList[7] = new BackgroundObject(800, 0, _handler.getAssetByName('battle_tree_foreground'));

        _battleZone = _backgroundList[4]

        _battleZone.init();
        _UI = new BattleUI(240, 540, handler);
        _UI.init();
    };

    this.quit = function(alarm, gameState) {
        gameState.setCurrentRoom(gameState.getNextRoom());
        alarm.getTransistor().setDestroyed(true);
        _battleZone.reset();
    };

    this.reset = function() {
        // reset UI
        _UI.reset();
        _backgroundList[0].setXY(0, 0);
        _backgroundList[1].setXY(0, 0);
        _backgroundList[2].setXY(0, -20);
        _backgroundList[3].setXY(0, -20);
        _battleZone.setXY(540, 0);
        _backgroundList[5].setXY(0, 0);
        _backgroundList[6].setXY(840, 0);
        _backgroundList[7].setXY(800, 0);

        _quitTimer = 60;
        this.setState(BATTLE.INTRODUCTION);
    };

    this.introductionUpdate = function() {
        // mountain
        _backgroundList[1].approachX(960, 38);
        // tree background
        _backgroundList[2].approachX(1300, 30);
        // tree back
        _backgroundList[3].approachX(1000, 30);
        // tree foreground
        _backgroundList[7].approachX(560, 30);
        // grass
        _battleZone.approachX(830, 30);
        _backgroundList[5].approachX(200, 35);
        _backgroundList[6].approachX(960, 35);

        _backgroundList[0].approachY(0, 30);
        _backgroundList[1].approachY(0, 30);
        _backgroundList[2].approachY(0, 30);
        _backgroundList[3].approachY(0, 30);

        _battleZone.update();
    };

    this.update = function() {
        if (_state === BATTLE.INTRODUCTION) {
            this.introductionUpdate();
        } else {
            _battleZone.update();
            _UI.update();
        }
        if (_state === BATTLE.END) {
            --_quitTimer;
            if (_quitTimer <= 0) {
                handler.getKeyManager().pause;
                // pause gameState
                handler.getGameState().pause();

                // start alarm
                var alarm = handler.getAlarmByName('battleQuit');
                    alarm.start();
            }
        }
    };

    this.render = function(ctx) {
        for (var i = 0; i < _backgroundList.length; ++i) {
            _backgroundList[i].render(ctx);
        }
        _UI.render(ctx);
    };

    this.setState = function(state) {
        _state = state;
        _battleZone.setState(state);
        _UI.setState(state);
    };

    this.getBattleZone = function() {
        return _battleZone;
    };

    this.getUI = function() {
        return _UI;
    };
};
