var Handler = function(game) {
    var _game = game;

    this.getAssetByName = function(name) {
        return _game.getAssets().getAssetByName(name);
    };

    this.getAssets = function() {
        return _game.getAssets();
    };

    this.getKey = function(keyCode) {
        return _game.getKeyManager().getKey(keyCode);
    };

    this.getKeyDown = function(keyCode) {
        return _game.getKeyManager().getKeyDown(keyCode);
    };

    this.getKeyUp = function(keyCode) {
        return _game.getKeyManager().getKeyUp(keyCode);
    };

    this.getPlayer = function() {
        return _game.getPlayer();
    };

    this.getTile = function(row, col) {
        return _game.getGameState().getTile(row, col);
    };

    this.getCamera = function() {
        return _game.getCamera();
    };

    this.getGameState = function() {
        return _game.getGameState();
    };

    this.getBattlefield = function() {
        return _game.getGameState().getRoomByName('battlefield');
    };

    this.getKeyManager = function() {
        return _game.getKeyManager();
    };

    this.getAlarmByName = function(name) {
        return _game.getGameState().getAlarmByName(name);
    };

    this.playAudioByName = function(name) {
        _game.playAudioByName(name);
    };
};