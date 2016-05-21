var Game = function() {
    var _assets = new Assets();
    var _sounds = new Sound();

    var _keyManager = new KeyManager();

    var _handler = new Handler(this);

    var _states = [new GameState(_handler)];
    var _currentState = 0; // 0 for game state, 1 for battle state

    var _player = new Player(0, 0, _handler);
    var _camera = new Camera(0, 0);

    var _vignette = _assets.getAssetByName('vignette');

    this.init = function() {
        // initialize assets
        _assets.init();
        // initialize audio
        _sounds.init();
        _states[0].init();
        // init player
        _player.init();
        // bind camera to player
        _camera.setTarget(_player);
    };

    this.update = function() {
        _keyManager.update();
        _states[_currentState].update();
    };

    this.render = function(ctx) {
        ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        _states[_currentState].render(ctx);
    };

    // getters
    this.getAssets = function() {
        return _assets;
    };

    this.getKeyManager = function() {
        return _keyManager;
    };

    this.getPlayer = function() {
        return _player;
    };

    this.getGameState = function() {
        return _states[_currentState];
    };

    this.getCamera = function() {
        return _camera;
    };

    this.playAudioByName = function(name) {
        _sounds.playAudioByName(name);
    };
};