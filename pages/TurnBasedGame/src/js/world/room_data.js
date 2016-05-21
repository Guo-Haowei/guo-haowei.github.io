var TOWN = {
    id: 'town',
    spawning: {
        x: 17*48,
        y: 7*48
    },
    room: [
        [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,-100,  39,  40,-100, 100, 100, 100, 100, 100, 100],
        [ 100, -10, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11,  32,   5, -11, -11, -11, -11, -11, -12, 100],
        [ 100, -13, -14, -14, -14, -14, -14, -14, -14, -14,   9, -14, -14, -14,   3,  28, -14,   9, -14, -14, -14, -15, 100],
        [ 100, -13, 100, 100, 100, 100, 100,-100,  -9,  -9,   9,-100,  -9,  36,   4,   4,  -2,   9,  -9,-100, 100, -15, 100],
        [ 100, -13,-100,  -9,   9,-100, 100,-100,-100,-100, 100,-100,  22,   3,   4,   4,  -5, 100,-100,-100, 100, -15, 100],
        [ -17, -18,-100,-100, 100,-100, 100,  24, 100, 100,  23,   0,   1,   7,   7,   7,  30,  23, 100, 100, 100, -16, -17],
        [ -20, -21,  24,   0,   1,   1,  35,   1,   1,   1,   1,   4,  38, 100, 100, 100,   6,   2, 100,  23, 100, -19, -20],
        [  41,   1,   1,   4,  27,   4,   4,   4,   4,   4,   4,   5,  -9,  -9,  -9,  -9, 100,   3,   1,   1,   1,  31,  45],
        [  42,  27,   4,   4,   4,   4,   4,   4,  37,   7,   7,   7,   2, 100, 100, 100,   0,  34,   7,   7,   7,   7,  46],
        [ -11, -12,   4,  29,   4,  -4,  -4,  -8, 100, 100,  23,  25,   6,   1,  26,   1,   5,  24,  25,  25, 100, -10, -11],
        [ -14, -16, -17, -17, -17, -17, -17, -17, -17, -17, -12, 100,  25,  33,   4,   4,  38, -10, -11, -11, -11, -18, -14],
        [ 100, -19, -20, -20, -20, -20, -20, -20, -20, -20, -16, -17, -17, -12,   3,   5, -10, -18, -14, -14, -14, -21, 100],
        [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, -19, -20, -20, -15,   3,   5, -13, -21, 100, 100, 100, 100, 100],
        [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, -15,  43,  44, -13, 100, 100, 100, 100, 100, 100],
        [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, -15,   3,   5, -13, 100, 100, 100, 100, 100, 100],
        [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,  -9,   3,   5,  -9, 100, 100, 100, 100, 100, 100],
        [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,  -9,  -9,  -9,  -9, 100, 100, 100, 100, 100, 100],
        [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    ],
    topObjects: [
        { x: 2*48, y: 2*48, sprites: ['mayor_top']},
        { x: 16*48, y: 1*48, sprites: ['blacksmith_top']},
        { x: 7*48, y: -1*48, sprites: ['inn_top']},
        { x: 13*48, y: 6*48, sprites: ['fountain_top_0', 'fountain_top_1', 'fountain_top_2']},
        { x: 12*48-6, y: 3*48-12, sprites: ['pot_top']},
        { x: 12*48-6, y: 7*48-12, sprites: ['pot_top']},
        { x: 5*48, y: 8*48+3, sprites: ['cart_top']},
        { x: -96, y: -12, sprites: ['small_tree']},
        { x: 48*16, y: 48*13, sprites: ['ancient_tree']},
        { x: 48*20, y: 48*14, sprites: ['ancient_tree']},
        { x: 48*5, y: 48*14, sprites: ['ancient_tree']},
        { x: 48*12, y: 48*13, sprites: ['ancient_tree_top_0']},
        { x: 48*14, y: 48*13, sprites: ['ancient_tree_top_4']},
        { x: 48*16, y: 48*13, sprites: ['ancient_tree_top_2']},
        { x: 48*17, y: 48*13, sprites: ['ancient_tree_top_3']},
        { x: 48*7, y: 48*14, sprites: ['ancient_tree_top_0']},
        { x: 48*9, y: 48*14, sprites: ['ancient_tree_top_4']},
        { x: 48*11, y: 48*14, sprites: ['ancient_tree_top_4']},
        { x: 48*13, y: 48*14, sprites: ['ancient_tree_top_4']},
        { x: 48*15, y: 48*14, sprites: ['ancient_tree_top_4']},
        { x: 48*17, y: 48*14, sprites: ['ancient_tree_top_3']},
        { x: 48*6, y: 48*16, sprites: ['ancient_tree_top_0']},
        { x: 48*8, y: 48*16, sprites: ['ancient_tree_top_4']},
        { x: 48*10, y: 48*16, sprites: ['ancient_tree_top_4']},
        { x: 48*12, y: 48*16, sprites: ['ancient_tree_top_4']},
        { x: 48*13, y: 48*16, sprites: ['ancient_tree_top_4']},
        { x: 48*15, y: 48*16, sprites: ['ancient_tree_top_4']},
        { x: 48*17, y: 48*16, sprites: ['ancient_tree_top_4']},
        { x: 48*19, y: 48*16, sprites: ['ancient_tree_top_4']},
        { x: 48*21, y: 48*16, sprites: ['ancient_tree_top_3']},
    ],
    bottomObjects: [
        { x: 2*48, y: 5*48, sprites: ['mayor_bottom']},
        { x: 16*48, y: 4*48, sprites: ['blacksmith_bottom']},
        { x: 7*48, y: 4*48, sprites: ['inn_bottom']},
        { x: 13*48, y: 7*48, sprites: ['fountain_bottom_0', 'fountain_bottom_1', 'fountain_bottom_2']},
        { x: 12*48-6, y: 3*48, sprites: ['pot_bottom']},
        { x: 12*48-6, y: 7*48, sprites: ['pot_bottom']},
        { x: 5*48, y: 9*48, sprites: ['cart_bottom']},
        { x: -1*48, y: 9*48, sprites: ['big_tree']},
        { x: 2*48, y: 10*48-12, sprites: ['big_tree']},
        { x: 19*48, y: 13*48, sprites: ['stump']},
    ],
    transistors: [
        { x: 48*14, y: 48*15.5, width: 96, height: 24, newX: 13*48, newY: 2.5*48, roomName: 'ancient_forest'},
        { x: 48*17, y: 48*3, width: 48, height: 48, newX: 6*48, newY: 10*48, roomName: 'blacksmith'},
        { x: 48*8, y: 48*6, width: 48, height: 48, newX: 0, newY: 0, roomName: 'battlefield', type: TRANSITION.BATTLE},
        { x: 48*2, y: 48*8, width: 48, height: 48, newX: 0, newY: 0, roomName: 'battlefield', type: TRANSITION.BATTLE}
    ]
};

var ANCIENT_FOREST = {
    id: 'ancient',
    spawning: {
        x: 10*48,
        y: 10*48
    },
    room: [
        [   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,  -9,  -9,  -9,   9,   9,   9,   9,   9,   9,   9,   9],
        [   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,  -9,   9,  -9,   9,   9,   9,   9,   9,   9,   9,   9],
        [   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,  -9,   9,  -9,   9,   9,   9,   9,   9,   9,   9,   9],
        [  -9,-100,-100,-100,-100,-100,-100,-100,-100,-100,-100,-100,-100, 100,-100,-100,-100,-100,-100,-100,-100,-100,  -9],
        [  -9,  66,  52,  60, 100, 100, 100, 100, 100,  61, 100, 100, -50,  51, -52, 100, 100, 100, 100,  65,  60, 100,  -9],
        [  -9,  54,  68, 100, 100, 100, 100, 100, 100, -64, 100, 100,  53,  70,  55, 100,-100,-100, 100, 100, -63, 100,  -9],
        [  -9,  69,  58, 100, 100,-100,-100,-100, 100, 100,  66,  51,  54,  54,  55, 100, 100, 100, 100, 100, 100, 100,  -9],
        [  -9, 100, 100, 100, 100,-100,-100,-100, 100, 100,  53,  54,  54,  70,  58, 100, 100, 100, 100, 100,  61, 100,  -9],
        [  -9, 100, 100, 100, 100,-100,-100,-100, 100, 100,  53,  67,  54,  58, 100, 100, 100, 100, 100, 100, 100, 100,  -9],
        [  -9, 100,  61, 100, 100, 100, 100, 100,  62, 100,  53,  54,  55, 100, 100, 100, 100, 100, 100, -64, 100, 100,  -9],
        [  -9, 100, 100, 100, 100, 100, 100, 100, 100,  60,  53,  70,  55, 100,  60,-100,-100,-100, 100, 100, 100, 100,  -9],
        [  -9, 100, -63,-100,-100, -64, 100, 100,  50,  51,  54,  54,  55, 100, 100,-100,-100,-100,  62,  66,  52, 100,  -9],
        [  -9, 100,  65, 100, 100, 100, 100, 100,  53,  67,  54,  54,  55, 100, 100,-100,-100,-100, 100,  53,  68, 100,  -9],
        [  -9, 100, 100, 100,  65, 100, 100, 100,  56,  54,  54,  54,  55, 100, 100,  62,  61, 100, 100,  56,  58, 100,  -9],
        [  -9,  59, 100, -64, 100, 100, 100, 100, 100,  69,  57,  57,  68, 100, 100, 100, 100, 100,  59, 100, 100, 100,  -9],
        [  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9,  -9],
    ],
    topObjects: [
        // left
        { x: 48*0, y: 48*-1, sprites: ['ancient_tree_top_3']},
        { x: 48*0, y: 48*1, sprites: ['ancient_tree_top_3']},
        { x: 48*0, y: 48*3, sprites: ['ancient_tree_top_3']},
        { x: 48*0, y: 48*5, sprites: ['ancient_tree_top_3']},
        { x: 48*0, y: 48*7, sprites: ['ancient_tree_top_3']},
        { x: 48*0, y: 48*9, sprites: ['ancient_tree_top_3']},
        { x: 48*0, y: 48*11, sprites: ['ancient_tree_top_3']},
        { x: 48*0, y: 48*13, sprites: ['ancient_tree_top_3']},
        // right
        { x: 48*21, y: 48*-2, sprites: ['ancient_tree_top_0']},
        { x: 48*21, y: 48*0, sprites: ['ancient_tree_top_0']},
        { x: 48*21, y: 48*2, sprites: ['ancient_tree_top_0']},
        { x: 48*21, y: 48*4, sprites: ['ancient_tree_top_0']},
        { x: 48*21, y: 48*6, sprites: ['ancient_tree_top_0']},
        { x: 48*21, y: 48*8, sprites: ['ancient_tree_top_0']},
        { x: 48*21, y: 48*10, sprites: ['ancient_tree_top_0']},
        { x: 48*21, y: 48*12, sprites: ['ancient_tree_top_0']},
        { x: 48*21, y: 48*13, sprites: ['ancient_tree_top_0']},
        // door
        { x: 48*10.5, y: 48*-1, sprites: ['ancient_door_top']},
        // tree1
        { x: 48*5, y: 48*3, sprites: ['ancient_trees_top']},
        { x: 48*3.5, y: 48*3, sprites: ['ancient_trees_left']},
        { x: 48*8, y: 48*3, sprites: ['ancient_trees_right']},
        // tree2
        { x: 48*15, y: 48*7, sprites: ['ancient_trees_top']},
        { x: 48*13.5, y: 48*7, sprites: ['ancient_trees_left']},
        { x: 48*18, y: 48*7, sprites: ['ancient_trees_right']},
        // tree3
        { x: 48*2, y: 48*7, sprites: ['ancient_tree_top']},
        // tree4
        { x: 48*15, y: 48*1, sprites: ['ancient_tree_top']},

        { x: 48*13, y: 48*11, sprites: ['ancient_tree_top']},
        { x: 48*5, y: 48*13, sprites: ['ancient_tree_tip']},
        { x: 48*18, y: 48*13, sprites: ['ancient_tree_tip']},
        // bottom
        { x: 48*0, y: 48*14, sprites: ['ancient_tree_top_bar']},
        { x: 48*2, y: 48*14, sprites: ['ancient_tree_top_bar']},
        { x: 48*4, y: 48*14, sprites: ['ancient_tree_top_bar']},
        { x: 48*6, y: 48*14, sprites: ['ancient_tree_top_bar']},
        { x: 48*8, y: 48*14, sprites: ['ancient_tree_top_bar']},
        { x: 48*10, y: 48*14, sprites: ['ancient_tree_top_bar']},
        { x: 48*12, y: 48*14, sprites: ['ancient_tree_top_bar']},
        { x: 48*14, y: 48*14, sprites: ['ancient_tree_top_bar']},
        { x: 48*16, y: 48*14, sprites: ['ancient_tree_top_bar']},
        { x: 48*18, y: 48*14, sprites: ['ancient_tree_top_bar']},
        { x: 48*20, y: 48*14, sprites: ['ancient_tree_top_bar']},
    ],
    bottomObjects: [
        { x: 48*0, y: 48*-2, sprites: ['ancient_tree_wall']},
        { x: 48*2, y: 48*-2, sprites: ['ancient_tree_wall']},
        { x: 48*4, y: 48*-2, sprites: ['ancient_tree_wall']},
        { x: 48*6, y: 48*-2, sprites: ['ancient_tree_wall']},
        { x: 48*8, y: 48*-2, sprites: ['ancient_tree_wall']},
        { x: 48*10, y: 48*-2, sprites: ['ancient_tree_wall']},
        { x: 48*12, y: 48*-2, sprites: ['ancient_tree_wall']},
        { x: 48*14, y: 48*-2, sprites: ['ancient_tree_wall']},
        { x: 48*16, y: 48*-2, sprites: ['ancient_tree_wall']},
        { x: 48*18, y: 48*-2, sprites: ['ancient_tree_wall']},
        { x: 48*20, y: 48*-2, sprites: ['ancient_tree_wall']},
        // tree1
        { x: 48*5, y: 48*6, sprites: ['ancient_trees_bottom']},
        // tree2
        { x: 48*15, y: 48*10, sprites: ['ancient_trees_bottom']},
        // tree3
        { x: 48*2, y: 48*11, sprites: ['ancient_tree_bottom']},
        // tree4
        { x: 48*15, y: 48*5, sprites: ['ancient_tree_bottom']},
        // door
        { x: 48*10.5, y: 48*3, sprites: ['ancient_door_bottom']},
    ],
    transistors: [
        { x: 48*13, y: 48*2, width: 48, height: 24, newX: 48*14.5, newY: 14.5*48, roomName: 'town'}
    ]
};

var BLACKSMITH = {
    id: 'blacksmith',
    spawning: {
        x: 7*48,
        y: 7*48
    },
    room: [
        [   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9],
        [   9,   9,   9,   9,  80,  81,  81,  81,  81,  81,  81,  91,  91,  91,  91,  92,   9,   9,   9,   9],
        [   9,   9,   9,   9,  83, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,  95,   9,   9,   9,   9],
        [   9,   9,   9,   9, -83,  -9,  -9,  -9,  -9, 100, 100,-100,-100,-100,-100, -95,   9,   9,   9,   9],
        [   9,   9,   9,   9, -83,  71,  74,  71,  74, -72, -73,  74, 100,-100,-100, -95,   9,   9,   9,   9],
        [   9,   9,   9,   9, -83, -72, -71,  72,  73,  71,  74, 100, 100,-100,-100, -95,   9,   9,   9,   9],
        [   9,   9,   9,   9, -93,  73,  74,  72,-100, 100, 100, 100, 100, 100, 100, -95,   9,   9,   9,   9],
        [   9,   9,   9,   9, -93, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, -95,   9,   9,   9,   9],
        [   9,   9,   9,   9, -93, 100, 100, 100, 100, 100, 100, 100, 100,-100,-100, -95,   9,   9,   9,   9],
        [   9,   9,   9,   9, -96, -89, 100, -99, -97, -97, -97, -97, -97, -97, -97, -98,   9,   9,   9,   9],
        [   9,   9,   9,   9,   9, -93, 100, -95,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9,   9],
    ],
    topObjects: [
        { x: 48*5+8, y: 48*4.5, sprites: ['anvil_top']},
        { x: 48*13, y: 48*7+36, sprites: ['barrel_top']},
        { x: 48*14, y: 48*7+36, sprites: ['barrel_top']},
        { x: 48*8-6, y: 48*5+12, sprites: ['adam_top']},
    ],
    bottomObjects: [
        { x: 48*11, y: 48*2, sprites: ['blacksmith_wall']},
        { x: 48*12, y: 48*2, sprites: ['blacksmith_wall']},
        { x: 48*11, y: 48*3, sprites: ['blacksmith_wall']},
        { x: 48*12, y: 48*3, sprites: ['blacksmith_wall']},
        { x: 48*8, y: 48*2, sprites: ['blacksmith_stone_wall']},
        { x: 48*8, y: 48*3, sprites: ['blacksmith_stone_wall']},
        { x: 48*5, y: 48*2, sprites: ['blacksmith_weapons']},
        { x: 48*9, y: 48*1, sprites: ['forge']},
        { x: 48*13, y: 48*3, sprites: ['blacksmith_bed']},
        { x: 48*10, y: 48*7, sprites: ['blacksmith_rug']},
        { x: 48*5+8, y: 48*5, sprites: ['anvil_bottom']},
        { x: 48*13, y: 48*8, sprites: ['barrel_bottom']},
        { x: 48*14, y: 48*8, sprites: ['barrel_bottom']},
        { x: 48*8-6, y: 48*6, sprites: ['adam_bottom']},
    ],
    transistors: [
        { x: 48*6, y: 48*11, width: 48, height: 48, newX: 48*17, newY: 48*4, roomName: 'town'}
    ]
};

var ROOMS = {
    town: TOWN,
    ancient_forest: ANCIENT_FOREST,
    blacksmith: BLACKSMITH
};