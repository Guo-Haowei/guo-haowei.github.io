var Panel = function(handler, renderScript, actionScript, text) {
    var _handler = handler;

    this._left = null;
    this._right = null;
    this._up = null;
    this._down = null;
    this._parent = null;
    this._child = null;

    var _text = (typeof text === 'undefined')?'':text;

    var _display = false;
    var _renderScript = renderScript;

    var _actionScript = (typeof actionScript === 'undefined')?goToChildScript:actionScript;

    this.fireAction = function() {
        if (_actionScript)
            return _actionScript(handler, this);
    };

    this.render = function(ctx, x, y) {
        if (!_display)
            return;
        if (_renderScript)
            _renderScript(ctx, handler, x, y, _text);
    };

    this.setDisplay = function(bool) {
        _display = bool;
    };

    this.getLeft = function() {
        if (this._left) {
            this._left.setDisplay(true);
            _display = false;
        }
        return this._left;
    };

    this.getRight = function() {
        if (this._right) {
            _display = false;
            this._right.setDisplay(true);
        }
        return this._right;
    };

    this.getUp = function() {
        if (this._up) {
            _display = false;
            this._up.setDisplay(true);
        }
        return this._up;
    };

    this.getDown = function() {
        if (this._down) {
            _display = false;
            this._down.setDisplay(true);
        }
        return this._down;
    };

    this.getParent = function() {
        if (this._parent) {
            _display = false;
        }
        return this._parent;
    };

    this.linkRight = function(panel) {
        this._right = panel;
        panel._left = this;
    };

    this.linkUp = function(panel) {
        this._up = panel;
        panel._down = this;
    };

    this.setParent = function(parent) {
        this._parent = parent;
    };

    this.setChild = function(child) {
        this._child = child;
    };

    this.hideChildAndDown = function() {
        this.setDisplay(false);
        if (this._down !== null)
            this._down.hideChildAndDown();
        if (this._child !== null)
            this._child.hideChildAndDown();
    };

    this.hideChildren = function() {
        if (this._child)
            this._child.hideChildAndDown();
    };
};

var BattleUI = function(x, y, handler) {
    var _originX = x;
    var _originY = y;
    var _x = x;
    var _y = y;
    var _handler = handler;

    var _cursor;
    
    var _frameSprite = handler.getAssetByName('battle_ui_frame');
    var _actionSprite = handler.getAssetByName('battle_ui_action');
    var _itemSprite = handler.getAssetByName('battle_ui_item');
    var _runSprite = handler.getAssetByName('battle_ui_run');

    var _state = BATTLE.IDLING;

    var _offsets = {
        y: 18,
        actionX: 60,
        itemX: 230,
        runX: 370,
        frameY: 450,
        actionPanel: {
            x: 40,
            y: -170
        },
        actionInfoPanel: {
            x: 280,
            y: -170
        },
        itemInfoPanel: {
            x: 316,
            y: -170
        }
    };

    var _active = false;

    var _runPanel = new Panel(handler, runRenderScript, runActionScript);

    var _actionPanel = new Panel(handler, actionRenderScript);
    var _itemPanel = new Panel(handler, itemRenderScript);
    var _actionAttack = new Panel(handler, attackScript);
    var _actionDefend = new Panel(handler, defendScript);
    var _actionFireball = new Panel(handler, fireballScript);
    var _itemApple = new Panel(handler, applePanelScript);
    var _itemPotion = new Panel(handler, potionPanelScript);

    var _useAttackPanel = new Panel(handler, usePanelScript, useAttackScript);
    var _infoAttackPanel = new Panel(handler, infoPanelScript);

    var _useDefendPanel = new Panel(handler, usePanelScript, useDedendScript);
    var _infoDefendPanel = new Panel(handler, infoPanelScript);

    var _useFireballPanel = new Panel(handler, usePanelScript, useFireballScript);
    var _infoFireballPanel = new Panel(handler, infoPanelScript);

    var _useApplePanel = new Panel(handler, usePanelScript, useAppleScript);
    var _infoApplePanel = new Panel(handler, infoPanelScript);

    var _usePotionPanel = new Panel(handler, usePanelScript, usePotionScript);
    var _infoPotionPanel = new Panel(handler, infoPanelScript);

    var _attackInfo = new Panel(handler, renderInfo, null, 'Basic melee\nattack.');
    var _defendInfo = new Panel(handler, renderInfo, null, 'Receive less \ndamage, set\naction bar\nto half.')
    var _appleInfo = new Panel(handler, renderInfo, null, 'Heal 20\nhealth.');
    var _potionInfo = new Panel(handler, renderInfo, null, 'Heal 30\nhealth.');
    var _sonarInfo = new Panel(handler, renderInfo, null, 'Spell, higher\ndamage, lower \ncritical\nchance.')

    var _moveDir = 0;

    this.resetPanels = function() {
        _actionPanel.setDisplay(true);
        _itemPanel.setDisplay(false);
        _runPanel.setDisplay(false);
        _actionPanel.hideChildren();
        _itemPanel.hideChildren();
        _runPanel.hideChildren();
        _cursor = _actionPanel;
    };

    this.reset = function() {
        _state = BATTLE.IDLING;
        _cursor = _actionPanel;
        _x = _originX;
        _y = _originY;
        this.resetPanels();
    };

    this.init = function() {
        _actionPanel.setDisplay(true);
        _cursor = _actionPanel;
        // main panels
        _actionPanel.linkRight(_itemPanel);
        _itemPanel.linkRight(_runPanel);
        // action
        _actionPanel.setChild(_actionAttack);
        _actionAttack.setParent(_actionPanel);
        _actionDefend.setParent(_actionPanel);
        _actionFireball.setParent(_actionPanel);
        _actionFireball.linkUp(_actionDefend);
        _actionDefend.linkUp(_actionAttack);
        // items
        _itemPanel.setChild(_itemApple);
        _itemApple.setParent(_itemPanel);
        _itemPotion.setParent(_itemPanel);
        _itemPotion.linkUp(_itemApple);
        // Attack
        _useAttackPanel.setParent(_actionAttack);
        _infoAttackPanel.setParent(_actionAttack);
        _actionAttack.setChild(_useAttackPanel);
        _infoAttackPanel.linkUp(_useAttackPanel);
        // Defend
        _useDefendPanel.setParent(_actionDefend);
        _infoDefendPanel.setParent(_actionDefend);
        _actionDefend.setChild(_useDefendPanel);
        _infoDefendPanel.linkUp(_useDefendPanel);
        // Fireball
        _useFireballPanel.setParent(_actionFireball);
        _infoFireballPanel.setParent(_actionFireball);
        _actionFireball.setChild(_useFireballPanel);
        _infoFireballPanel.linkUp(_useFireballPanel);
        // Apple
        _useApplePanel.setParent(_itemApple);
        _infoApplePanel.setParent(_itemApple);
        _itemApple.setChild(_useApplePanel);
        _infoApplePanel.linkUp(_useApplePanel);
        // Potion
        _usePotionPanel.setParent(_itemPotion);
        _infoPotionPanel.setParent(_itemPotion);
        _itemPotion.setChild(_usePotionPanel);
        _infoPotionPanel.linkUp(_usePotionPanel);
        // attack info
        _attackInfo.setParent(_infoAttackPanel);
        _infoAttackPanel.setChild(_attackInfo);
        // defend info
        _defendInfo.setParent(_infoDefendPanel);
        _infoDefendPanel.setChild(_defendInfo);
        // sonar info
        _sonarInfo.setParent(_infoFireballPanel);
        _infoFireballPanel.setChild(_sonarInfo);
        // apple info
        _appleInfo.setParent(_infoApplePanel);
        _infoApplePanel.setChild(_appleInfo);
        // portion info
        _potionInfo.setParent(_infoPotionPanel);
        _infoPotionPanel.setChild(_potionInfo);
    };

    this.processInput = function() {
        var next = null;
        if (_handler.getKeyDown(KEYCODE.LEFT)) {
            next = _cursor.getLeft();
        } else if (_handler.getKeyDown(KEYCODE.RIGHT)) {
            next = _cursor.getRight();
        } else if (_handler.getKeyDown(KEYCODE.UP)) {
            next = _cursor.getUp();
        } else if (_handler.getKeyDown(KEYCODE.DOWN)) {
            next = _cursor.getDown();
        } else if (_handler.getKeyDown(KEYCODE.X)) {
            next = _cursor.fireAction();
        } else if (_handler.getKeyDown(KEYCODE.Z)) {
            next = _cursor.getParent();
        }
        if (next)
            _cursor = next;
    };

    this.update = function() {
        // bring up
        switch (_state) {
            case BATTLE.IDLING: {
                _y += _moveDir * 4;
                if (_y <= 420 && _moveDir === -1) {
                    _moveDir = 0;
                    _handler.getBattlefield().setState(BATTLE.WAITING_INPUT);
                }
                break;
            }
            case BATTLE.WAITING_INPUT: {
                this.processInput();
                break;
            }
            case BATTLE.PLAYER_ACTION:
            case BATTLE.PLAYER_ITEM:
            case BATTLE.PLAYER_RUN: {
                _y += _moveDir * 4;
                if (_y >= 540 && _moveDir === 1) {
                    _moveDir = 0;
                }
                break;
            }
            default: {
                break;
            }
        }
    };

    this.render = function(ctx) {
        // render
        _actionSprite.draw(ctx, _x+_offsets.actionX, _y+_offsets.y);
        _itemSprite.draw(ctx, _x+_offsets.itemX, _y+_offsets.y);
        _runSprite.draw(ctx, _x+_offsets.runX, _y+_offsets.y);
        _frameSprite.draw(ctx, _x, _y);

        _actionPanel.render(ctx, _x+_offsets.actionX, _y+_offsets.y);
        _itemPanel.render(ctx, _x+_offsets.itemX, _y+_offsets.y);
        _runPanel.render(ctx, _x+_offsets.runX, _y+_offsets.y);

        _actionAttack.render(ctx, _x+_offsets.actionPanel.x, _y+_offsets.actionPanel.y);
        _actionDefend.render(ctx, _x+_offsets.actionPanel.x, _y+_offsets.actionPanel.y);
        _actionFireball.render(ctx, _x+_offsets.actionPanel.x, _y+_offsets.actionPanel.y);

        _itemApple.render(ctx, _x+_offsets.actionPanel.x-30, _y+_offsets.actionPanel.y);
        _itemPotion.render(ctx, _x+_offsets.actionPanel.x-30, _y+_offsets.actionPanel.y);

        _useAttackPanel.render(ctx, _x+_offsets.actionInfoPanel.x, _y+_offsets.actionInfoPanel.y);
        _infoAttackPanel.render(ctx, _x+_offsets.actionInfoPanel.x, _y+_offsets.actionInfoPanel.y);
        _useDefendPanel.render(ctx, _x+_offsets.actionInfoPanel.x, _y+_offsets.actionInfoPanel.y);
        _infoDefendPanel.render(ctx, _x+_offsets.actionInfoPanel.x, _y+_offsets.actionInfoPanel.y);
        _useFireballPanel.render(ctx, _x+_offsets.actionInfoPanel.x, _y+_offsets.actionInfoPanel.y);
        _infoFireballPanel.render(ctx, _x+_offsets.actionInfoPanel.x, _y+_offsets.actionInfoPanel.y);
    

        _useApplePanel.render(ctx, _x+_offsets.itemInfoPanel.x-30, _y+_offsets.itemInfoPanel.y);
        _infoApplePanel.render(ctx, _x+_offsets.itemInfoPanel.x-30, _y+_offsets.itemInfoPanel.y);
        _usePotionPanel.render(ctx, _x+_offsets.itemInfoPanel.x-30, _y+_offsets.itemInfoPanel.y);
        _infoPotionPanel.render(ctx, _x+_offsets.itemInfoPanel.x-30, _y+_offsets.itemInfoPanel.y);

        _attackInfo.render(ctx, 0, 0);
        _defendInfo.render(ctx, 0, 0);
        _appleInfo.render(ctx, 0, 0);
        _potionInfo.render(ctx, 0, 0);
        _sonarInfo.render(ctx, 0, 0);

    };

    this.setState = function(state) {
        _state = state;
    };

    this.setDir = function(dir) {
        _moveDir = dir;
    };
};

var BOX = {
    offsets: {
        y0: 25,
        y1: 60,
        y2: 95,
        x: 45
    },
    caret: {
        x: 15,
        y: 60
    },
    size: {
        w_action: 17,
        w_item: 20, 
        w_info: 11,
        h: 10
    }
};

var actionRenderScript = function(ctx, handler, x, y) {
    handler.getAssetByName('battle_ui_action').draw(ctx, x, y);
};

var itemRenderScript = function(ctx, handler, x, y) {
    handler.getAssetByName('battle_ui_item').draw(ctx, x, y);
};

var runRenderScript = function(ctx, handler, x, y) {
    handler.getAssetByName('battle_ui_run').draw(ctx, x, y);
};

var attackScript = function(ctx, handler, x, y) {
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y2, 'Defend', handler);

    drawTextBox(ctx, x, y, BOX.size.w_action, BOX.size.h, handler);
    handler.getAssetByName('caret').draw(ctx, x + BOX.caret.x, y + BOX.caret.y);
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y1, 'Attack', handler);
};

var defendScript = function(ctx, handler, x, y) {
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y0, 'Attack', handler);
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y2, 'Sonar', handler);

    drawTextBox(ctx, x, y, BOX.size.w_action, BOX.size.h, handler);
    handler.getAssetByName('caret').draw(ctx, x + BOX.caret.x, y + BOX.caret.y);
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y1, 'Defend', handler);
};

var fireballScript = function(ctx, handler, x, y) {
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y0, 'Defend', handler);

    drawTextBox(ctx, x, y, BOX.size.w_action, BOX.size.h, handler);
    handler.getAssetByName('caret').draw(ctx, x + BOX.caret.x, y + BOX.caret.y);
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y1, 'Sonar', handler);
};

var applePanelScript = function(ctx, handler, x, y) {
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y2, 'x'+PLAYER.items.potion.toString()+' Potions', handler);

    drawTextBox(ctx, x, y, BOX.size.w_item, BOX.size.h, handler);
    handler.getAssetByName('caret').draw(ctx, x + BOX.caret.x, y + BOX.caret.y);
    
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y1, 'x'+PLAYER.items.apple.toString()+' Apples', handler);
};

var potionPanelScript = function(ctx, handler, x, y) {
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y0, 'x'+PLAYER.items.apple.toString()+' Apples', handler);

    drawTextBox(ctx, x, y, BOX.size.w_item, BOX.size.h, handler);
    handler.getAssetByName('caret').draw(ctx, x + BOX.caret.x, y + BOX.caret.y);

    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y1, 'x'+PLAYER.items.potion.toString()+' Potions', handler);
};

var usePanelScript = function(ctx, handler, x, y) {
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y1+20, 'Info', handler);

    drawTextBox(ctx, x, y, BOX.size.w_info, BOX.size.h, handler);
    handler.getAssetByName('caret').draw(ctx, x + BOX.caret.x, y + BOX.offsets.y0+10);
    
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y0+10, 'Use', handler);
};

var infoPanelScript = function(ctx, handler, x, y) {
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y0+10, 'Use', handler);

    drawTextBox(ctx, x, y, BOX.size.w_info, BOX.size.h, handler);
    handler.getAssetByName('caret').draw(ctx, x + BOX.caret.x, y + BOX.offsets.y1+20);
        
    renderText(ctx, x+BOX.offsets.x, y+BOX.offsets.y1+20, 'Info', handler);

};

var renderInfo = function(ctx, handler, x, y, text) {
    // textbox
    var fixedX = 680,
        fixedY = 200;
    drawTextBox(ctx, fixedX, fixedY, 21, 15, handler);
    // text
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; ++i) {
        renderText(ctx, fixedX+18, fixedY+18+i*40, lines[i], handler);
    }
};

var runActionScript = function(handler, panel) {

    var battlefield = handler.getBattlefield();
    battlefield.getUI().resetPanels();
    battlefield.getUI().setDir(1);

    battlefield.setState(BATTLE.PLAYER_ACTION);
    battlefield.getBattleZone().getElizabeth().setActionState(ACTION.RUN);
};

var goToChildScript = function(handler, panel) {
    if (!panel._child)
        return null;
    panel._child.setDisplay(true);
    return panel._child;
};

var useAttackScript = function(handler, panel) {
    PLAYER.defending = false;
    var battlefield = handler.getBattlefield();
    battlefield.getUI().resetPanels();
    battlefield.getUI().setDir(1);
    battlefield.setState(BATTLE.PLAYER_ACTION);
    battlefield.getBattleZone().getElizabeth().setActionState(ACTION.APPROACH);
};

var useDedendScript = function(handler, panel) {
    var battlefield = handler.getBattlefield();
    battlefield.getUI().resetPanels();
    battlefield.getUI().setDir(1);
    battlefield.setState(BATTLE.PLAYER_ACTION);
    battlefield.getBattleZone().getElizabeth().setActionState(ACTION.DEFEND);
    PLAYER.defending = true;
};

var useFireballScript = function(handler, panel) {
    PLAYER.defending = false;
    var battlefield = handler.getBattlefield();
    battlefield.getUI().resetPanels();
    battlefield.getUI().setDir(1);
    battlefield.setState(BATTLE.PLAYER_ACTION);
    battlefield.getBattleZone().getElizabeth().setActionState(ACTION.RANGED);
};

var useAppleScript = function(handler, panel) {
    if (PLAYER.items.apple < 1)
        return;
    PLAYER.defending = false;
    var battlefield = handler.getBattlefield();
    battlefield.getUI().resetPanels();
    battlefield.getUI().setDir(1);
    battlefield.setState(BATTLE.PLAYER_ACTION);
    battlefield.getBattleZone().getElizabeth().setActionState(ACTION.ITEM);
    battlefield.getBattleZone().getElizabeth().setHealValue(20);
    --PLAYER.items.apple;
    battlefield.getBattleZone()._infoBar1.actionIndex = 0;
};

var usePotionScript = function(handler, panel) {
    if (PLAYER.items.potion < 1)
        return;
    PLAYER.defending = false;
    var battlefield = handler.getBattlefield();
    battlefield.getUI().resetPanels();
    battlefield.getUI().setDir(1);
    battlefield.setState(BATTLE.PLAYER_ACTION);
    battlefield.getBattleZone().getElizabeth().setActionState(ACTION.ITEM);
    battlefield.getBattleZone().getElizabeth().setHealValue(30);
    --PLAYER.items.potion;
    battlefield.getBattleZone()._infoBar1.actionIndex = 0;
};