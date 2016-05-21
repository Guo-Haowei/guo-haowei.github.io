// create canvas
var canvas = document.createElement("canvas");
var CTX = canvas.getContext("2d");

var SCREEN_WIDTH = 960;//canvas.offsetWidth;
var SCREEN_HEIGHT = 540;//canvas.offsetHeight;
canvas.width = SCREEN_WIDTH; canvas.height = SCREEN_HEIGHT;
document.body.appendChild(canvas);

var WORLD_WIDTH, WORLD_HEIGHT;
var MAX_NUM_TILE_X = Math.ceil(SCREEN_WIDTH/48),
    MAX_NUM_TILE_Y = Math.ceil(SCREEN_HEIGHT/48);

// game loop
var lastTime, now = Date.now(), fps = 70, delta = 0;


// keys
var KEYCODE = { UP: 87, LEFT: 65, DOWN: 83, RIGHT: 68, Z: 90, X: 88};

// bool
var BOOL = { FALSE: 0, TRUE: 1 };

// face
var DIR = { UP: 0, DOWN: 1, LEFT: 2, RIGHT: 3 };

// transistor type
var TRANSITION = { NONE: 0, ROOM: 1, BATTLE: 2 };

// battle state
var BATTLE = { INTRODUCTION: 0, IDLING: 1, WAITING_INPUT: 2, PLAYER_ACTION: 3, MONSTER_ACTION: 4, END: 5 };

var ACTION = { IDLE: 0, APPROACH: 1, ATTACK: 2, HIT: 3, RETURN: 4, RANGED: 5, ITEM: 6, RUN: 7, DEFEND: 8 };

// player json
var PLAYER = {
    level: 1,
    health: 30,
    maxHealth: 30,
    actionMeterSpeed: 0.7,
    damage: 5,
    fireball: 8,
    critChance: 0.4,
    items: {
        apple: 4,
        potion: 2
    },
    defending: false,
    exp: 0
};

var MONSTERS = {
    spider: {
        actionMeterSpeed: 0.5,
    }
};

var renderText = function(ctx, x, y, text, handler) {
    for (var i = 0; i < text.length; ++i) {
        var sprite = handler.getAssets().characters[text[i]];
        if (sprite) {
            sprite.draw(ctx, x+(i*18), y);
        }
    }
};

var repeatSpriteH = function(ctx, x, y, times, sprite) {
    for (var i = 0; i < times; ++i) {
        sprite.draw(ctx, x+i*sprite.width, y);
    }
};

var drawTextBox = function(ctx, x, y, width, height, handler) {
    handler.getAssetByName('textbox_0').draw(ctx, x, y);
    repeatSpriteH(ctx, x+12, y, width, handler.getAssetByName('textbox_1'));
    handler.getAssetByName('textbox_2').draw(ctx, x+12*width+12, y);
    for (var i = 0; i < height; ++i) {
        handler.getAssetByName('textbox_3').draw(ctx, x, y+12+i*12);
        repeatSpriteH(ctx, x+12, y+12+i*12, width, handler.getAssetByName('textbox_4'));
        handler.getAssetByName('textbox_5').draw(ctx, x+12*width+12, y+12+i*12);
    }
    handler.getAssetByName('textbox_6').draw(ctx, x, y+12*height+12);
    repeatSpriteH(ctx, x+12, y+12*height+12, width, handler.getAssetByName('textbox_7'));
    handler.getAssetByName('textbox_8').draw(ctx, x+12*width+12, y+12*height+12);
};

// num to tile sprite
var NumToSprite = function() {
    var obj = {
        // town
        // walls
        10: ['wall_0'], 11: ['wall_1'], 12: ['wall_2'], 13: ['wall_3'], 14: ['wall_4'], 15: ['wall_5'], 16: ['wall_6'], 17: ['wall_7'], 18: ['wall_8'], 19: ['wall_9'], 20: ['wall_10'], 21: ['wall_11'],
        // ground
        0: ['dirt_0'], 1: ['dirt_1'], 2: ['dirt_2'], 3: ['dirt_3'], 4: ['dirt_4'], 5: ['dirt_5'], 6: ['dirt_6'], 7: ['dirt_7'], 8: ['dirt_8'],
        // grass
        22: ['grass_0'], 23: ['grass_1'], 24: ['grass_2'], 25: ['grass_3'],
        // dirt & rock
        26: ['dirt_1', 'small_rock_0'], 27: ['dirt_4', 'small_rock_0'], 28: ['dirt_5', 'small_rock_0'], // rock 0
        29: ['dirt_4', 'small_rock_1'], 30: ['dirt_5', 'small_rock_1'], // rock 1
        31: ['dirt_1', 'small_rock_2'], 32: ['dirt_3', 'small_rock_2'], 33: ['dirt_6', 'small_rock_2'], 34: ['dirt_7', 'small_rock_2'], // rock 2
        35: ['dirt_1', 'small_rock_3'], 36: ['dirt_3', 'small_rock_3'], 37: ['dirt_7', 'small_rock_3'], 38: ['dirt_8', 'small_rock_3'], // rock 2
        39: ['dirt_0', 'arrow_0'], 40: ['dirt_2', 'arrow_0'], // arrow up
        41: ['dirt_1', 'arrow_1'], 42: ['dirt_4', 'arrow_1'], // arrow left
        43: ['dirt_3', 'arrow_2'], 44: ['dirt_5', 'arrow_2'], // arrow down
        45: ['dirt_1', 'arrow_3'], 46: ['dirt_7', 'arrow_3'], // arrow right

        // ancient
        50: ['ancient_dirt_0'], 51: ['ancient_dirt_1'], 52: ['ancient_dirt_2'], 53: ['ancient_dirt_3'], 54: ['ancient_dirt_4'], 55: ['ancient_dirt_5'], 56: ['ancient_dirt_6'], 57: ['ancient_dirt_7'], 58: ['ancient_dirt_8'],
        // ancient grass
        59: ['ancient_grass_0'], 60: ['ancient_grass_1'], 61: ['ancient_grass_2'], 62: ['ancient_grass_3'],
        // ancient mushroom
        63: ['ancient_mushroom_0'], 64: ['ancient_mushroom_1'], 65: ['ancient_mushroom_2'],
        // pebbles
        66: ['ancient_dirt_0', 'ancient_pebble_3'], 67: ['ancient_dirt_4', 'ancient_pebble_0'], 68: ['ancient_dirt_5', 'ancient_pebble_1'], 69: ['ancient_dirt_6', 'ancient_pebble_2'], 70: ['ancient_dirt_4', 'ancient_pebble_2'],
        // blacksmith
        71: ['blacksmith_rock_floor_0'], 72: ['blacksmith_rock_floor_1'], 73: ['blacksmith_rock_floor_2'], 74: ['blacksmith_rock_floor_3'],

        // blacksmith stone wall
        80: ['black', 'blacksmith_stone_wall_0'], 81: ['black', 'blacksmith_stone_wall_1'], 82: ['black', 'blacksmith_stone_wall_2'], 83: ['black', 'blacksmith_stone_wall_3'], 84: ['blacksmith_stone_wall_4'], 85: ['black', 'blacksmith_stone_wall_5'], 86: ['black', 'blacksmith_stone_wall_6'], 87: ['black', 'blacksmith_stone_wall_7'], 88: ['black', 'blacksmith_stone_wall_8'],
        // blacksmith wall
        90: ['black', 'blacksmith_wall_0'], 91: ['black', 'blacksmith_wall_1'], 92: ['black', 'blacksmith_wall_2'], 93: ['black', 'blacksmith_wall_3'], 94: ['blacksmith_stone_wall_4'], 95: ['black', 'blacksmith_wall_5'], 96: ['black', 'blacksmith_wall_6'], 97: ['black', 'blacksmith_wall_7'], 98: ['black', 'blacksmith_wall_8'], 89: ['black', 'blacksmith_wall_top_right'], 99: ['black', 'blacksmith_wall_top_left']
    };

    this.getSpriteList = function(num) {
        var key = num.toString();
        if (key in obj)
            return obj[key];
        else
            return [];
    };
};

var numToSprite = new NumToSprite();
