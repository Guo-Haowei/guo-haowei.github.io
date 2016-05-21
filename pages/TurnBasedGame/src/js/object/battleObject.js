var randomDamageGenerator = function(damage, critChance) {
    return damage * (Math.random() < critChance?2:1);
};

var ElizabethObject = function(x, y, handler) {
    var _relativeX = x;
    var _relativeY = y;
    var _handler = handler;

    var _shieldSprite = handler.getAssetByName('shield');
    var _shieldY = 300;
    var _shieldX = 250;
    var _shieldDynamicX = 300;

    var _originX = x;
    var _originY = y;

    var _destX = 630;

    this.zIndex = 0;

    var _timer = 0;

    var _elizabeth_idle_animation = new Animation(9, handler.getAssets().elizabeth_idle);
    var _elizabeth_hit_animation = new Animation(12, handler.getAssets().elizabeth_hit);

    var _state = BATTLE.INTRODUCTION;
    var _actionState = ACTION.IDLING;

    var _currentSprite;
    var _doesDamage = 0;

    var _damageValue;
    var _sonar = false;
    var _sonarIndex = 0;
    var _sonarX;

    var _healValue;

    var _levelUpAlarm = 0;

    this.updateIdling = function() {
        if (_actionState === ACTION.HIT) {
            _currentSprite = _elizabeth_hit_animation.getFrame();
            _elizabeth_hit_animation.update();
            if (_elizabeth_hit_animation.finished()) {
                _actionState = ACTION.IDLING;
            }
        } else {
            _elizabeth_idle_animation.update();
            _currentSprite = _elizabeth_idle_animation.getFrame();
        }
    };

    this.reset = function() {
        _state = BATTLE.INTRODUCTION;
        _actionState = ACTION.IDLING;
        _relativeX = _originX;
        _timer = 0;
        _doesDamage = 0;
        PLAYER.defending = false;
    };

    this.approach = function(timerCap, spriteLen) {
        var interval = Math.floor((_destX - _originX)/spriteLen);
        var movedDistance = _relativeX - _originX;
        var index = Math.floor(movedDistance/interval);
        _currentSprite = _handler.getAssets().elizabeth_approach[index];
        _relativeX += (_destX - _originX)/timerCap;

        ++_timer;
        if (_timer === timerCap) {
            _timer = 0;
            _actionState = ACTION.ATTACK;
            _relativeX = _destX;
            // set z index
            this.zIndex = 1;
            _handler.getBattlefield().getBattleZone().getMonster().zIndex = 0;
            _doesDamage = randomDamageGenerator(PLAYER.damage, PLAYER.critChance);
            _damageValue = _doesDamage;
        }
    };

    this.attack = function(timerCap, spriteLen) {
        _currentSprite = _handler.getAssets().elizabeth_attack[Math.floor(_timer/timerCap*spriteLen)];

        ++_timer;
        if (_doesDamage > 0) {
            --_doesDamage;
            _handler.getBattlefield().getBattleZone().doDamage(2);
        }

        if (_timer === timerCap) {
            _timer = 0;
            _actionState = ACTION.RETURN;
            _handler.getBattlefield().getBattleZone().getMonster().setActionState(ACTION.HIT);
        }
    };

    this.defend = function(timerCap, spriteLen) {
        var index = Math.floor(spriteLen*_timer/(timerCap))
        _currentSprite = _handler.getAssets().elizabeth_idle[index];

        ++_timer;
        if (_timer === timerCap) {
            _timer = 0;
            _actionState = ACTION.IDLING;
            _handler.getBattlefield().setState(BATTLE.IDLING);
            _handler.getBattlefield().getBattleZone()._infoBar1.actionIndex = 31;
        }
    };

    this.heal = function(timerCap, spriteLen) {
        var index = Math.floor(spriteLen*_timer/(timerCap))
        _currentSprite = _handler.getAssets().elizabeth_idle[index];

        if (_healValue > 0) {
            --_healValue;
            _handler.getBattlefield().getBattleZone().heal(1);
        }

        ++_timer;
        if (_timer === timerCap) {
            _timer = 0;
            _actionState = ACTION.IDLING;
            _handler.getBattlefield().setState(BATTLE.IDLING);
        }
    };

    this.ranged = function(timerCap, spriteLen) {
        var index = Math.floor(spriteLen*_timer/(timerCap))
        _currentSprite = _handler.getAssets().elizabeth_ranged[index];
        _sonar = true;
        _sonarIndex = index;
        _sonarX = _relativeX + Math.floor((_timer/timerCap)*(_destX - _originX)); 

        ++_timer;
        if (_timer === Math.floor(timerCap/3*2)) {
            this.zIndex = 1;
            _handler.getBattlefield().getBattleZone().getMonster().zIndex = 0;
            _doesDamage = PLAYER.fireball;
            _handler.getBattlefield().getBattleZone().getMonster().setActionState(ACTION.HIT);
        }

        if (_doesDamage > 0) {
            --_doesDamage;
            _handler.getBattlefield().getBattleZone().doDamage(2);
        }

        if (_timer === timerCap) {
            _timer = 0;
            _sonar = false;
            // set state back to idling
            _handler.getBattlefield().setState(BATTLE.IDLING);
            _actionState = ACTION.IDLING;
            // reset action bar
            _handler.getBattlefield().getBattleZone()._infoBar1.actionIndex = 0;

            if (_handler.getBattlefield().getBattleZone()._infoBar2.healthIndex <= 0) {
                _handler.getBattlefield().setState(BATTLE.END);
                var prevLevel = PLAYER.level;
                PLAYER.exp += 7;
                PLAYER.level = Math.floor(PLAYER.exp/10)+1;
                if (prevLevel < PLAYER.level) {
                    PLAYER.maxHealth += 3;
                    PLAYER.damage += 1;
                    PLAYER.fireball += 2;
                    PLAYER.health = PLAYER.maxHealth;
                    _levelUpAlarm = 33;
                }
            }
        }
    };

    this.run = function(timerCap, spriteLen) {
        var index = Math.floor(spriteLen*_timer/(timerCap));
        _currentSprite = _handler.getAssets().elizabeth_run[index];

        ++_timer;
        if (_timer === timerCap) {
            _timer = 0;
    
            // pause gameState
            _handler.getGameState().pause();

            // start alarm
            var alarm = _handler.getAlarmByName('battleQuit');
                alarm.start();
        }
    };

    this.return = function(timerCap, spriteLen) {
        var interval = Math.floor((_destX - _originX)/spriteLen);
        var movedDistance = _destX - _relativeX;
        var index = Math.floor(movedDistance/interval);
        _currentSprite = _handler.getAssets().elizabeth_return[index];
        _relativeX -= (_destX - _originX)/timerCap;

        ++_timer;
        if (_timer === timerCap) {
            _timer = 0;
            // set state back to idling
            _handler.getBattlefield().setState(BATTLE.IDLING);
            _actionState = ACTION.IDLING;
            // reset action bar
            _handler.getBattlefield().getBattleZone()._infoBar1.actionIndex = 0;
            if (_handler.getBattlefield().getBattleZone()._infoBar2.healthIndex <= 0) {
                _handler.getBattlefield().setState(BATTLE.END);
                var prevLevel = PLAYER.level;
                PLAYER.exp += 7;
                PLAYER.level = Math.floor(PLAYER.exp/10)+1;
                if (prevLevel < PLAYER.level) {
                    PLAYER.maxHealth += 3;
                    PLAYER.damage += 1;
                    PLAYER.fireball += 2;
                    PLAYER.health = PLAYER.maxHealth;
                    _levelUpAlarm = 33;
                }
            }
        }
    };

    this.updateAction = function() {
        switch (_actionState) {
            case ACTION.APPROACH:
                this.approach(30, 6);
                break;
            case ACTION.ATTACK:
                this.attack(16, 4);
                break;
            case ACTION.RETURN:
                this.return(30, 5);
                break;
            case ACTION.RANGED:
                this.ranged(60, 9);
                break;
            case ACTION.RUN:
                this.run(60, 4);
                break;
            case ACTION.DEFEND:
                this.defend(60, 4);
                break;
            case ACTION.ITEM:
                this.heal(60, 4);
            default:
                break;
        }
    };

    this.update = function() {
        switch (_state) {
            case BATTLE.INTRODUCTION:
            case BATTLE.IDLING:
            case BATTLE.WAITING_INPUT:
            case BATTLE.END:
                this.updateIdling();
                break;
            default:
                this.updateAction();
                break;
        }
    };

    this.render = function(ctx, x, y) {
        _currentSprite.drawFromBottom(ctx, _relativeX + x, _relativeY + y);
        if (_actionState === ACTION.RETURN)
            renderText(ctx, 690, 180, '-'+ _damageValue.toString(), handler);
        if (PLAYER.defending === true)
            _shieldSprite.draw(ctx, _shieldX, _shieldY);
        if (_sonar === true)
            _handler.getAssets().sonar[_sonarIndex].draw(ctx, _sonarX, 150);
        if (_levelUpAlarm > 0) {
            var index = Math.ceil(_levelUpAlarm/3);
            _handler.getAssets().levelup_bar[11-index].draw(ctx, 300, 200);
            --_levelUpAlarm;
        }
    };

    this.setState = function(state) {
        _state = state;
    };

    this.setActionState = function(state) {
        _actionState = state;
    };

    this.setHealValue = function(value) {
        _healValue = value;
    };
};

var returnIntBetween = function(low, high) {
    return low + Math.floor((high-low)*Math.random());
};

var returnRandomMonster = function() {
    var rand = Math.random();
    if (rand <= 0.4)
        return 'spider';
    if (rand <= 0.6)
        return 'wolf';
};

var Monster = function(x, y, handler) {
    var _relativeX = x;
    var _relativeY = y;
    var _originX;
    var _originY;
    var _handler = handler;

    var _destX;

    this.zIndex = 0; 

    var _state = BATTLE.INTRODUCTION;
    var _actionState = ACTION.IDLING;

    this.level = returnIntBetween(Math.floor(PLAYER.level/2)+1, PLAYER.level);

    var _doesDamage = 0;
    var _damageValue;

    var _monsterSet = {
        spider: {
            x: 720,
            _idleAnimation: new Animation(7, handler.getAssets().spider_idle),
            _hitAnimation: new Animation(12, handler.getAssets().spider_hit),
            critChance: 0.2,
            _name: 'spider',
            health: 15,
            maxHealth: 15,
            damage: 4,
            destX: 200,
        }
    };

    var _monsterType;
    var _timer = 0;
    var _currentSprite;

    this.maxHealth;
    this.health;
    this.damage;

    this.reset = function() {
        _state = BATTLE.INTRODUCTION;
        _actionState = ACTION.IDLING;
        _relativeX = _originX;
        // random monster type
        this.level = returnIntBetween(Math.floor(PLAYER.level/2)+1, PLAYER.level);
        this.maxHealth = _monsterType.health+(this.level-1);
        this.health = this.maxHealth;
        this.damage = _monsterType.damage+Math.floor(this.level/3);

        _destX = _monsterType.destX;
        _timer = 0;
        _doesDamage = 0;
    };

    this.init = function() {
        // set monster randomly
        // random monster type
        _monsterType = _monsterSet['spider'];
        this.level = returnIntBetween(Math.floor(PLAYER.level/2)+1, PLAYER.level);
        
        this.maxHealth = _monsterType.health+(this.level-1);
        this.health = this.maxHealth;
        this.damage = _monsterType.damage+Math.floor(this.level/3);

        _destX = _monsterType.destX;

        _relativeX = _monsterType.x;
        _relativeY = 400;
        _originX = _monsterType.x;
        _originY = 400;
    };

    this.updateIdling = function() {
        if (_actionState === ACTION.HIT) {
            _currentSprite = _monsterType._hitAnimation.getFrame();
            _monsterType._hitAnimation.update();
            if (_monsterType._hitAnimation.finished()) {
                _actionState = ACTION.IDLING;
            }
        } else {
            _currentSprite = _monsterType._idleAnimation.getFrame();
            _monsterType._idleAnimation.update();
        }
    };

    this.approach = function(timerCap, spriteLen) {
        var interval = Math.floor((_originX - _destX)/spriteLen);
        var movedDistance = _originX - _relativeX;
        var index = Math.floor(movedDistance/interval);
        if (index < spriteLen && index >= 0)
            _currentSprite = _handler.getAssets()[_monsterType._name+'_approach'][index];
        _relativeX += (_destX - _originX)/timerCap;

        ++_timer;
        if (_timer === timerCap) {
            _timer = 0;
            _actionState = ACTION.ATTACK;
            _relativeX = _destX;
            // set z index
            this.zIndex = 1;
            _handler.getBattlefield().getBattleZone().getElizabeth().zIndex = 0;
            _doesDamage = randomDamageGenerator(this.damage, _monsterType.critChance);
            if (PLAYER.defending === true)
                _doesDamage = Math.floor(_doesDamage/2);
            _damageValue = _doesDamage;
        }
    };

    this.attack = function(timerCap, spriteLen) {
        _currentSprite = _handler.getAssets()[_monsterType._name+'_attack'][Math.floor(_timer/timerCap*spriteLen)];
        ++_timer;

        if (_doesDamage > 0) {
            --_doesDamage;
            _handler.getBattlefield().getBattleZone().doDamage(1);
        }

        if (_timer === timerCap) {
            _timer = 0;
            _actionState = ACTION.RETURN;
            _handler.getBattlefield().getBattleZone().getElizabeth().setActionState(ACTION.HIT);
            PLAYER.defending = false;
        }
    };

    this.return = function(timerCap, spriteLen) {
        var interval = Math.floor((_originX - _destX)/spriteLen);
        var movedDistance = _relativeX - _destX
        var index = Math.floor(movedDistance/interval);
        
        _currentSprite = _handler.getAssets()[_monsterType._name+'_return'][index];
        _relativeX += (_originX - _destX)/timerCap;

        ++_timer;
        if (_timer === timerCap) {
            _timer = 0;
            // set state back to idling
            _handler.getBattlefield().setState(BATTLE.IDLING);
            _actionState = ACTION.IDLING;
            // reset action bar
            _handler.getBattlefield().getBattleZone()._infoBar2.actionIndex = 0;
            _relativeX = _originX;
        }
    };

    this.updateAction = function() {
        switch (_actionState) {
            case ACTION.APPROACH:
                this.approach(30, 3);
                break;
            case ACTION.ATTACK:
                this.attack(16, 3);
                break;
            case ACTION.RETURN:
                this.return(30, 1);
                break;
            default:
                break;
        }
    };

    this.update = function() {
        switch (_state) {
            case BATTLE.INTRODUCTION:
            case BATTLE.IDLING:
            case BATTLE.WAITING_INPUT:
            case BATTLE.PLAYER_ACTION:
                this.updateIdling();
                break;
            case BATTLE.END:
                _currentSprite = null;
                break;
            default:
                this.updateAction();
                break;
        }
    };

    this.render = function(ctx, x, y) {
        if (_currentSprite)
            _currentSprite.drawFromBottom(ctx, _relativeX + x, _relativeY + y, 1, 1);
        if (_actionState === ACTION.RETURN)
            renderText(ctx, 220, 200, '-'+ _damageValue.toString(), handler);
    };

    this.setState = function(state) {
        _state = state;
    };

    this.setActionState = function(state) {
        _actionState = state;
    };
};