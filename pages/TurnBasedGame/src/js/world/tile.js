// Static tiles

var Tile = function(x, y, handler, spriteList, isSolid) {
    var _x = x;
    var _y = y;
    var _handler = handler;
    var _isSolid = isSolid;
    var _spriteList = spriteList;

    this.render = function(ctx) {
        var xOffset = _handler.getCamera().getXOffset(),
            yOffset = _handler.getCamera().getYOffset();
        for (var i = 0; i < _spriteList.length; ++i) 
            _spriteList[i].draw(ctx, _x-xOffset, _y-yOffset);
    };

    this.renderMask = function(ctx) {
        var xOffset = _handler.getCamera().getXOffset(),
            yOffset = _handler.getCamera().getYOffset();
        if (_isSolid)
            _handler.getAssetByName('mask').draw(ctx, _x-xOffset, _y-yOffset);
    };

    // getters
    this.isSolid = function() {
        return _isSolid;
    };
};