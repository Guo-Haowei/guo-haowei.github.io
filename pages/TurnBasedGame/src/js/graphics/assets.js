var createSpriteMap = function() {
    var obj = new Object();
    // backgrounds
    // walls
    obj['wall_0']  = new Sprite(imageMap.walls,  0,   0, 48, 48);
    obj['wall_1']  = new Sprite(imageMap.walls, 48,   0, 48, 48);
    obj['wall_2']  = new Sprite(imageMap.walls, 96,   0, 48, 48);
    obj['wall_3']  = new Sprite(imageMap.walls,  0,  48, 48, 48);
    obj['wall_4']  = new Sprite(imageMap.walls, 48,  48, 48, 48);
    obj['wall_5']  = new Sprite(imageMap.walls, 96,  48, 48, 48);
    obj['wall_6']  = new Sprite(imageMap.walls,  0,  96, 48, 48);
    obj['wall_7']  = new Sprite(imageMap.walls, 48,  96, 48, 48);
    obj['wall_8']  = new Sprite(imageMap.walls, 96,  96, 48, 48);
    obj['wall_9']  = new Sprite(imageMap.walls,  0, 144, 48, 48);
    obj['wall_10'] = new Sprite(imageMap.walls, 48, 144, 48, 48);
    obj['wall_11'] = new Sprite(imageMap.walls, 96, 144, 48, 48);
    obj['wall_12'] = new Sprite(imageMap.walls,  0, 192, 48, 48);
    obj['wall_13'] = new Sprite(imageMap.walls, 48, 192, 48, 48);
    obj['wall_14'] = new Sprite(imageMap.walls, 96, 192, 48, 48);
    
    // grass & ancient base
    for (var i = 0; i < 16; ++i) {
        obj['grass_base_'+i.toString()] = new Sprite(imageMap.grass_base, (i%4)*48, Math.floor(i/4)*48, 48, 48);
        obj['ancient_base_'+i.toString()] = new Sprite(imageMap.ancient_base, (i%4)*48, Math.floor(i/4)*48, 48, 48);
    }
    // grass
    for (var i = 0; i < 4; ++ i) {
        var id = i.toString();
        // ancient grass
        obj['ancient_grass_'+id] = new Sprite(imageMap.ancient_grass, (i%2)*48, Math.floor(i/2)*48, 48, 48);
        // pebbles
        obj['ancient_pebble_'+id] = new Sprite(imageMap.ancient_pebbles, (i%2)*48, Math.floor(i/2)*48, 48, 48);
        // mushrooms
        obj['ancient_mushroom_'+id] = new Sprite(imageMap.ancient_mushrooms, (i%2)*48, Math.floor(i/2)*48, 48, 48);
        // grass
        obj['grass_'+id] = new Sprite(imageMap.grass, (i%2)*48, Math.floor(i/2)*48, 48, 48);
        // rock
        obj['small_rock_'+id] = new Sprite(imageMap.small_rocks, (i%2)*48, Math.floor(i/2)*48, 48, 48);
        obj['blacksmith_rock_floor_'+id] = new Sprite(imageMap.blacksmith_rock_floor, i*48, 0, 48, 48);
    }


    // dirt
    for (var i = 0; i < 9; ++i) {
        obj['dirt_'+i.toString()] = new Sprite(imageMap.dirt, (i%3)*48, Math.floor(i/3)*48, 48, 48);
        obj['ancient_dirt_'+i.toString()] = new Sprite(imageMap.ancient_dirt, (i%3)*48, Math.floor(i/3)*48, 48, 48);
    }

    // arrows
    obj['arrow_0'] = new Sprite(imageMap.arrows,  0, 48, 48, 48);
    obj['arrow_1'] = new Sprite(imageMap.arrows, 48, 48, 48, 48);
    obj['arrow_2'] = new Sprite(imageMap.arrows, 48,  0, 48, 48);
    obj['arrow_3'] = new Sprite(imageMap.arrows,  0,  0, 48, 48);

    // images
    // mask
    obj['mask'] = new Sprite(imageMap.mask, 0, 0, 48, 48);

    // elizabeth walk
    var str = 'elizabeth_walk_';
    for (var i = 0; i < 4; ++i) {
        obj[str+'up_'+i.toString()] = new Sprite(imageMap.elizabeth_walk, 96*i, 0, 96, 96);
        obj[str+'down_'+i.toString()] = new Sprite(imageMap.elizabeth_walk, 96*i, 96, 96, 96);
        obj[str+'left_'+i.toString()] = new Sprite(imageMap.elizabeth_walk, 96*i, 96*2, 96, 96);
        obj[str+'right_'+i.toString()] = new Sprite(imageMap.elizabeth_walk, 96*i, 96*3, 96, 96);
    }

    // houses
    obj['blacksmith_top'] = new Sprite(imageMap.blacksmith, 0, 0, 192, 144);
    obj['blacksmith_bottom'] = new Sprite(imageMap.blacksmith, 0, 144, 192, 48);
    obj['mayor_top'] = new Sprite(imageMap.mayor, 0, 0, 192, 144);
    obj['mayor_bottom'] = new Sprite(imageMap.mayor, 0, 144, 192, 48);
    obj['inn_top'] = new Sprite(imageMap.inn, 0, 0, 240, 240);
    obj['inn_bottom'] = new Sprite(imageMap.inn, 0, 240, 240, 48);
    
    // objects
    // pot
    obj['pot_top'] = new Sprite(imageMap.pot, 0, 0, 60, 12);
    obj['pot_bottom'] = new Sprite(imageMap.pot, 0, 12, 60, 48);
    // fountain
    for (var i = 0; i < 3; ++i) {
        obj['fountain_top_'+i.toString()] = new Sprite(imageMap.fountain, i*156, 0, 156, 48);
        obj['fountain_bottom_'+i.toString()] = new Sprite(imageMap.fountain, i*156, 48, 156, 48);
        obj['blacksmith_floor_'+i.toString()] = new Sprite(imageMap.blacksmith_floor, i*48, 0, 48, 48);
    }
    // cart
    obj['cart_top'] = new Sprite(imageMap.cart, 0, 0, 135, 45);
    obj['cart_bottom'] = new Sprite(imageMap.cart, 0, 45, 135, 48);

    // trees
    obj['small_tree'] = new Sprite(imageMap.small_tree, 0, 0, 240, 240);
    obj['big_tree'] = new Sprite(imageMap.big_tree, 0, 0, 240, 243);
    obj['ancient_trees'] = new Sprite(imageMap.ancient_trees, 0, 0, 288, 288);
    obj['ancient_tree_top_0'] = new Sprite(imageMap.ancient_trees, 0, 0, 96, 144);
    obj['ancient_tree_top_1'] = new Sprite(imageMap.ancient_trees, 96, 0, 48, 144);
    obj['ancient_tree_top_2'] = new Sprite(imageMap.ancient_trees, 144, 0, 48, 144);
    obj['ancient_tree_top_3'] = new Sprite(imageMap.ancient_trees, 192, 0, 96, 144);
    obj['ancient_tree_top_4'] = new Sprite(imageMap.ancient_trees, 96, 0, 96, 144);
    obj['ancient_tree_wall'] = new Sprite(imageMap.ancient_trees, 96, 0, 96, 288);

    obj['ancient_tree_top'] = new Sprite(imageMap.ancient_tree, 0, 0, 192, 192);
    obj['ancient_tree_tip'] = new Sprite(imageMap.ancient_tree, 0, 0, 192, 98);
    obj['ancient_tree_bottom'] = new Sprite(imageMap.ancient_tree, 0, 192, 192, 48);

    obj['ancient_trees_bottom'] = new Sprite(imageMap.ancient_trees, 72, 144, 144, 144);
    obj['ancient_trees_left'] = new Sprite(imageMap.ancient_trees, 0, 0, 72, 288);
    obj['ancient_trees_right'] = new Sprite(imageMap.ancient_trees, 216, 0, 72, 288);
    obj['ancient_trees_top'] = new Sprite(imageMap.ancient_trees, 72, 0, 144, 144);
    obj['ancient_tree_top_bar'] = new Sprite(imageMap.ancient_trees, 96, 0, 96, 96);

    obj['ancient_door_bottom'] = new Sprite(imageMap.ancient_door, 0, 192, 288, 96);
    obj['ancient_door_top'] = new Sprite(imageMap.ancient_door, 0, 0, 288, 192);

    obj['ancient_tree'] = new Sprite(imageMap.ancient_tree, 0, 0, 192, 240);

    obj['stump'] = new Sprite(imageMap.stump, 0, 0, 96, 96);

    // blacksmith
    obj['blacksmith_weapons'] = new Sprite(imageMap.blacksmith_weapons, 0, 0, 192, 98);
    for (var i = 0; i < 9; ++i) {
        obj['blacksmith_stone_wall_'+i.toString()] = new Sprite(imageMap.blacksmith_stone_wall, 48*(i%3), Math.floor(i/3)*48, 48, 48);
        obj['blacksmith_wall_'+i.toString()] = new Sprite(imageMap.blacksmith_wall, 48*(i%3), Math.floor(i/3)*48, 48, 48);
        obj['textbox_'+i.toString()] = new Sprite(imageMap.textbox, 12*(i%3), 12*Math.floor(i/3), 12, 12);
    }

    obj['blacksmith_wall'] = new Sprite(imageMap.blacksmith_wall, 0, 144, 144, 48);
    obj['blacksmith_stone_wall'] = new Sprite(imageMap.blacksmith_stone_wall, 0, 144, 144, 48);

    obj['blacksmith_wall_top_right'] = new Sprite(imageMap.blacksmith_wall, 144, 144, 48, 48);
    obj['blacksmith_wall_top_left'] = new Sprite(imageMap.blacksmith_wall, 144, 96, 48, 48);

    obj['forge'] = new Sprite(imageMap.forge, 0, 0, 96, 192);
    obj['black'] = new Sprite(imageMap.black, 0, 0, 48, 48);

    obj['anvil_top'] = new Sprite(imageMap.anvil, 0, 0, 87, 24);
    obj['anvil_bottom'] = new Sprite(imageMap.anvil, 0, 24, 87, 48);
    obj['blacksmith_rug'] = new Sprite(imageMap.blacksmith_rug, 0, 0, 126, 75);
    obj['blacksmith_bed'] = new Sprite(imageMap.blacksmith_bed, 0, 0, 96, 144);

    obj['barrel_top'] = new Sprite(imageMap.barrel, 0, 0, 48, 12);
    obj['barrel_bottom'] = new Sprite(imageMap.barrel, 0, 12, 48, 48);

    obj['adam_top'] = new Sprite(imageMap.adam, 0, 0, 60, 36);
    obj['adam_bottom'] = new Sprite(imageMap.adam, 0, 36, 60, 42);

    obj['vignette'] = new Sprite(imageMap.vignette, 0, 0, 960, 540);

    // battle
    obj['battle_foreground'] = new Sprite(imageMap.battle_foreground, 0, 0, 960, 540);
    obj['battle_grass_front'] = new Sprite(imageMap.battle_grass_front, 0, 0, 960, 540);
    obj['battle_mountain'] = new Sprite(imageMap.battle_mountain, 0, 0, 1200, 540);
    obj['battle_sky'] = new Sprite(imageMap.battle_sky, 0, 0, 960, 540);
    obj['battle_tree_back'] = new Sprite(imageMap.battle_tree_back, 0, 0, 1440, 540);
    obj['battle_tree_background'] = new Sprite(imageMap.battle_tree_background, 0, 0, 1500, 540);
    obj['battle_tree_foreground'] = new Sprite(imageMap.battle_tree_foreground, 0, 0, 1272, 540);
    obj['battle_zone'] = new Sprite(imageMap.battle_zone, 0, 0, 1260, 540);

    obj['info_bar'] = new Sprite(imageMap.info_bar, 0, 0, 204, 78);

    obj['battle_ui_frame'] = new Sprite(imageMap.battle_ui_frame, 0, 0, 510, 81);
    obj['battle_ui_action'] = new Sprite(imageMap.battle_ui_action, 0, 0, 123, 42);
    obj['battle_ui_item'] = new Sprite(imageMap.battle_ui_item, 0, 0, 78, 42);
    obj['battle_ui_run'] = new Sprite(imageMap.battle_ui_run, 0, 0, 75, 42);

    obj['caret'] = new Sprite(imageMap.caret, 0, 0, 24, 24);
    obj['shield'] = new Sprite(imageMap.shield, 0, 0, 96, 96);

    return obj;
};

function Assets() {
    // sprites
    // player
    var _assets = createSpriteMap();
    
    this.elizabeth_approach = new Array(6);
    this.elizabeth_attack = new Array(4);
    this.elizabeth_hit = new Array(3);
    this.elizabeth_idle = new Array(4);
    this.elizabeth_item = new Array(9);
    this.elizabeth_ranged = new Array(9);
    this.elizabeth_return = new Array(5);
    this.elizabeth_run = new Array(4);

    this.spider_idle = new Array(8);
    this.spider_hit = new Array(3);
    this.spider_approach = new Array(3);
    this.spider_attack = new Array(3);
    this.spider_return = new Array(1);

    this.health_bar = new Array(62);
    this.action_meter = new Array(62);

    this.battle_shine = new Array(7);

    this.sonar = new Array(9);

    this.characters = {};

    this.levelup_bar = new Array(11);
    this.levelup_arrow = new Array(6);

    // initialize assets
    this.init = function() {
        // sonar
        for (var i = 0; i < 9; ++i) {
            this.sonar[i] = new Sprite(imageMap.sonar, 195*i, 0, 195, 246);
        }
        // elizabeth hit
        for (var i = 0; i < 3; ++i) {
            this.elizabeth_hit[i] = new Sprite(imageMap.elizabeth_hit, 192*i, 0, 192, 192);
        }
        // elizabeth idle & attack & run
        for (var i = 0; i < 4; ++i) {
            this.elizabeth_idle[i] = new Sprite(imageMap.elizabeth_idle, 342*i, 0, 342, 255);
            this.elizabeth_attack[i] = new Sprite(imageMap.elizabeth_attack, 258*i, 0, 258, 255);
            this.elizabeth_run[i] = new Sprite(imageMap.elizabeth_run, 126*i, 0, 126, 150);
        }
        // elizabeth return
        for (var i = 0; i < 5; ++i) {
            this.elizabeth_return[i] = new Sprite(imageMap.elizabeth_return, 258*i, 0, 258, 255);
        }
        // elizabeth approach
        for (var i = 0; i < 6; ++i) {
            this.elizabeth_approach[i] = new Sprite(imageMap.elizabeth_approach, 258*i, 0, 258, 312);
        }
        // elizabeth item & ranged
        for (var i = 0; i < 9; ++i) {
            this.elizabeth_item[i] = new Sprite(imageMap.elizabeth_item, 342*i, 0, 342, 255);
            this.elizabeth_ranged[i] = new Sprite(imageMap.elizabeth_ranged, 342*i, 0, 342, 255);
        }

        // spider idle
        for (var i = 0; i < 8; ++i) {
            this.spider_idle[i] = new Sprite(imageMap.spider_idle, 258*i, 0, 258, 164);
        }

        // spider approach & attack
        for (var i = 0; i < 3; ++i) {
            this.spider_approach[i] = new Sprite(imageMap.spider_approach, 432*i, 0, 432, 216);
            this.spider_attack[i] = new Sprite(imageMap.spider_attack, 432*i, 0, 432, 216);
        }

        // spider hit
        for (var i = 0; i < 3; ++i) {
            this.spider_hit[i] = new Sprite(imageMap.spider_hit, i*432, 0, 432, 216);
        }

        this.spider_return[0] = new Sprite(imageMap.spider_return, 0, 0, 432, 216);

        // health bar
        for (var i = 0; i < 62; ++i) {
            this.health_bar[i] = new Sprite(imageMap.health_bar, 0, 9*i, 186, 9);
            this.action_meter[i] = new Sprite(imageMap.action_meter, 0, 6*i, 186, 6);
        }
        // battle shine
        for (var i = 0; i < 7; ++i) {
            this.battle_shine[i] = new Sprite(imageMap.battle_shine, i*21, 0, 21, 21);
        }
        // a-z
        for (var i = 0; i < 26; ++i) {
            this.characters[String.fromCharCode(i+65)] = new Sprite(imageMap.A_Z, i*24, 0, 24, 33);
            this.characters[String.fromCharCode(i+97)] = new Sprite(imageMap.a_z, i*24, 0, 24, 33);
        }
        // 0-9
        for (var i = 48; i < 58; ++i) {
            this.characters[String.fromCharCode(i)] = new Sprite(imageMap.zero_nine, (i-48)*24, 0, 24, 33);
        }
        // . , ! ? ' - + / :
        var charArr = ['.', ',', '!', '?', '\'', '-', '+', '/', ':'];

        for (var i = 0; i < charArr.length; ++i) {
            this.characters[charArr[i]] = new Sprite(imageMap.special_characters, i*24, 0, 24, 33);
        }
        // level up
        for (var i = 0; i < 11; ++i) {
            this.levelup_bar[i] = new Sprite(imageMap.levelup_bar, 0, 72*i, 336, 72);
        }

        for (var i = 0; i < 6; ++i) {
            this.levelup_arrow[i] = new Sprite(imageMap.levelup_arrow, 0*54, 0, 54, 66);
        }

    };
    
    this.getAssetByName = function(name) {
        var asset = _assets[name];
        if (typeof asset === 'undefined')
            console.error('asset [' + name + '] not found')
        return _assets[name];
    };
};