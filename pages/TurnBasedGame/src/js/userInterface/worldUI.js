var menuStatsScript = function(ctx, handler, x, y, text) {
    renderText(ctx, 58, 160, 'Items', handler);
    renderText(ctx, 58, 195, 'Save', handler);
    drawTextBox(ctx, 30, 30, 12, 16, handler);
    renderText(ctx, 58, 125, 'Stats', handler);
};

var menuItemsScript = function(ctx, handler, x, y, text) {
    renderText(ctx, 58, 90, 'Stats', handler);
    renderText(ctx, 58, 160, 'Save', handler);
    renderText(ctx, 58, 195, 'Load', handler);
    drawTextBox(ctx, 30, 30, 12, 16, handler);
    renderText(ctx, 58, 125, 'Items', handler);
};

var menuSaveScript = function(ctx, handler, x, y, text) {
    renderText(ctx, 58, 55, 'Stats', handler);
    renderText(ctx, 58, 90, 'Items', handler);
    renderText(ctx, 58, 160, 'Load', handler);
    drawTextBox(ctx, 30, 30, 12, 16, handler);
    renderText(ctx, 58, 125, 'Save', handler);
};

var menuLoadScript = function(ctx, handler, x, y, text) {
    renderText(ctx, 58, 55, 'Items', handler);
    renderText(ctx, 58, 90, 'Save', handler);
    drawTextBox(ctx, 30, 30, 12, 16, handler);
    renderText(ctx, 58, 125, 'Load', handler);
};

var statsScript = function(ctx, handler, x, y, text) {
    drawTextBox(ctx, 200, 30, 16, 16, handler);
    renderText(ctx, 220, 48, 'HP: '+PLAYER.health.toString()+'/'+PLAYER.maxHealth.toString(), handler);
    renderText(ctx, 220, 90, 'Level: '+PLAYER.level.toString(), handler);
    renderText(ctx, 220, 132, 'Exp: '+PLAYER.exp.toString(), handler);
    renderText(ctx, 220, 174, 'Attack: '+PLAYER.damage.toString(), handler);
};

var itemsScript = function(ctx, handler, x, y, text) {
    drawTextBox(ctx, 200, 30, 16, 16, handler);
    renderText(ctx, 220, 90, 'Apple x'+PLAYER.items.apple.toString(), handler);
    renderText(ctx, 220, 125, 'Potion x'+PLAYER.items.potion.toString(), handler);
};


var WorldUI = function(handler) {
    var _handler = handler;
    var _cursor;

    var _entryPanel = new Panel(handler, null);

    var _statsPanel = new Panel(handler, menuStatsScript);
    var _itemsPanel = new Panel(handler, menuItemsScript);
    var _savePanel = new Panel(handler, menuSaveScript);
    var _loadPanel = new Panel(handler, menuLoadScript);

    var _statsDetails = new Panel(handler, statsScript);
    var _itemsDetails = new Panel(handler, itemsScript);

    this.init = function() {
        _statsPanel.setParent(_entryPanel);
        _itemsPanel.setParent(_entryPanel);
        _savePanel.setParent(_entryPanel);
        _loadPanel.setParent(_entryPanel);

        _entryPanel.setChild(_statsPanel);

        _loadPanel.linkUp(_savePanel);
        _savePanel.linkUp(_itemsPanel);
        _itemsPanel.linkUp(_statsPanel);

        _statsDetails.setParent(_statsPanel);
        _statsPanel.setChild(_statsDetails);

        _itemsDetails.setParent(_itemsPanel);
        _itemsPanel.setChild(_itemsDetails);

        _cursor = _entryPanel;
    }

    this.update = function() {
        if (_handler.getGameState().getCurrentRoom() === 'battlefield')
            return;

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
            if (next !== _entryPanel)
                _handler.getPlayer().pause();
        } else if (_handler.getKeyDown(KEYCODE.Z)) {
            next = _cursor.getParent();
            if (next === _entryPanel) {
                _handler.getPlayer().start();
                _active = false;
            }
        }
        if (next)
            _cursor = next;
    }

    this.render = function(ctx) {
        _statsPanel.render(ctx, 0, 0);
        _itemsPanel.render(ctx, 0, 0);
        _savePanel.render(ctx, 0, 0);
        _loadPanel.render(ctx, 0, 0);

        _statsDetails.render(ctx, 0, 0);
        _itemsDetails.render(ctx, 0, 0);
    }
};