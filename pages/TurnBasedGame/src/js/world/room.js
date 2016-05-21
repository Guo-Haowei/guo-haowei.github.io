var Room = function(handler) {
    var _tiles = [];
    var _width;
    var _height;
    var _handler = handler;
    var _topObjects = [];
    var _bottomObjects = [];

    var _transistors = [];

    var _spawningX;
    var _spawningY;

    this.init = function(obj) {

        _width = obj.room[0].length || 0;
        _height = obj.room.length || 0;

        WORLD_WIDTH = _width * 48;
        WORLD_HEIGHT = _height * 48;

        _spawningX = obj.spawning.x;
        _spawningY = obj.spawning.y;

        // tiles
        for (var i = 0; i < _height; ++i) {
            var row = [];
            for (var j = 0; j < _width; ++j) {
                var tileType = obj.room[i][j], absTileType = Math.abs(tileType), tileTypeR = absTileType%100;
                var isSolid = Math.sign(tileType)===-1;
                var addtitionalSprite = Math.floor(tileType/100);
                var theme = obj.id;
                var index = ((i%4)*4+(j%4)).toString();
                var baseSprite = theme==='town'?'grass_base_'+index:
                    (theme==='ancient'?'ancient_base_'+index:
                        (theme==='blacksmith'?'blacksmith_floor_'+((j+i)%3).toString():''));
                var spriteList = [_handler.getAssetByName(baseSprite)];

                var spriteNameList = numToSprite.getSpriteList(absTileType);

                if (absTileType === 9) {
                    spriteList = [];
                } else {
                    for (var spriteNameListIndex = 0; spriteNameListIndex < spriteNameList.length; ++spriteNameListIndex)
                    spriteList.push(_handler.getAssetByName(spriteNameList[spriteNameListIndex]));
                }                
                row.push(new Tile(j*48, i*48, _handler, spriteList, isSolid));
            }
            _tiles.push(row);
        }
        

        // bottom objects
        for (var i = 0; i < obj.bottomObjects.length; ++i) {
            var botObj = obj.bottomObjects[i];
            if (botObj.sprites.length === 1) {
                _bottomObjects.push(new StaticGameObject(botObj.x, botObj.y, _handler, _handler.getAssetByName(botObj.sprites[0])));
            } else {
                var spritesArray = [];
                for (var j = 0; j < botObj.sprites.length; ++j)
                    spritesArray.push(_handler.getAssetByName(botObj.sprites[j]));
                _bottomObjects.push(new DynamicGameObject(botObj.x, botObj.y, _handler, spritesArray));
            }
        }

        // top objects
        for (var i = 0; i < obj.topObjects.length; ++i) {
            var topObj = obj.topObjects[i];
            if (topObj.sprites.length === 1) {
                _topObjects.push(new StaticGameObject(topObj.x, topObj.y, _handler, _handler.getAssetByName(topObj.sprites[0])));
            } else {
                var spritesArray = [];
                for (var j = 0; j < topObj.sprites.length; ++j)
                    spritesArray.push(_handler.getAssetByName(topObj.sprites[j]));
                _topObjects.push(new DynamicGameObject(topObj.x, topObj.y, _handler, spritesArray));
            }
        }

        // transistors
        for (var i = 0; i < obj.transistors.length; ++i) {
            var transistor = obj.transistors[i];
            var type = TRANSITION.ROOM;
            if (transistor.type)
                type = transistor.type;
            _transistors.push(new Transistor(
                transistor.x,
                transistor.y,
                transistor.width,
                transistor.height,
                _handler,
                transistor.newX,
                transistor.newY,
                transistor.roomName,
                type));
        }
    };

    this.reactiveTransistors = function() {
        for (var i = 0; i < _transistors.length; ++i) {
            _transistors[i].setDestroyed(false);
        }
    };

    this.update = function() {
        // update base
        for (var i = 0; i < _bottomObjects.length; ++i)
            _bottomObjects[i].update();

        _handler.getPlayer().update();

        // check transistor
        for (var i = 0; i < _transistors.length; ++i)
            _transistors[i].update();
    };

    this.render = function(ctx) {
        var xOffset = _handler.getCamera().getActualXOffset()-SCREEN_WIDTH/2,
            yOffset = _handler.getCamera().getActualYOffset()-SCREEN_HEIGHT/2;

        var xStart = Math.max(Math.floor(xOffset/48), 0),
            yStart = Math.max(Math.floor(yOffset/48), 0),
            xLen = Math.min(xStart+MAX_NUM_TILE_X+1, _width),
            yLen = Math.min(yStart+MAX_NUM_TILE_Y+1, _height);

        // render base
        for (var y = yStart; y < yLen; ++y)
            for (var x = xStart; x < xLen; ++x)
                _tiles[y][x].render(ctx);

        // render bottom objects
        for (var i = 0; i < _bottomObjects.length; ++i)
            _bottomObjects[i].render(ctx);

        // render player
        _handler.getPlayer().render(ctx);

        // render top objects
        for (var i = 0; i < _topObjects.length; ++i)
            _topObjects[i].render(ctx);

    };

    this.renderMask = function(ctx) {

        var xOffset = _handler.getCamera().getActualXOffset()-SCREEN_WIDTH/2,
            yOffset = _handler.getCamera().getActualYOffset()-SCREEN_HEIGHT/2;

        var xStart = Math.max(Math.floor(xOffset/48), 0),
            yStart = Math.max(Math.floor(yOffset/48), 0),
            xLen = Math.min(xStart+MAX_NUM_TILE_X+1, _width),
            yLen = Math.min(yStart+MAX_NUM_TILE_Y+1, _height);

        for (var y = yStart; y < yLen; ++y)
            for (var x = xStart; x < xLen; ++x)
                _tiles[y][x].renderMask(ctx);

        _handler.getPlayer().renderMask(ctx);

        // render transistors
        for (var i = 0; i < _transistors.length; ++i)
            _transistors[i].renderMask(ctx);
    };

    this.getTile = function(row, col) {
        try {
            return _tiles[row][col];
        } catch (err) {
            return null;
        }
    };

    this.setPlayer = function() {
        var player = _handler.getPlayer();
        player.setX(_spawningX);
        player.setY(_spawningY);
        _handler.getCamera().setOffsetToObj(player);
    };
};