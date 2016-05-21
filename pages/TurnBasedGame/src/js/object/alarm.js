var Alarm = function(maxTicks, script) {
    var _active = false;
    var _ticksSoFar = 0;
    var _maxTicks = maxTicks;

    var _script = script;

    var _transistor;

    this.reset = function() {
        _ticksSoFar = 0;
        _active = false;
    };

    this.update = function(handler) {
        if (!_active)
            return;
        ++_ticksSoFar;
        _script(handler, this);
    };

    this.start = function() {
        _active = true;
    };

    // setters and getters

    this.getTicksSoFar = function() {
        return _ticksSoFar;
    };

    this.getMaxTicks = function() {
        return _maxTicks;
    };

    this.setTransistor = function(transistor) {
        _transistor = transistor;
    };

    this.getTransistor = function() {
        return _transistor;
    };
};