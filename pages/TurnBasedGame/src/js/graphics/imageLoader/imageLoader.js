var loader = new PxLoader();

var createImageMap = function() {
    var obj = new Object();
    // background
    // town
    obj['walls'] = loader.addImage('assets/background/walls.png');
    obj['grass_base'] = loader.addImage('assets/background/grass_base.png');
    obj['grass'] = loader.addImage('assets/background/grass.png');
    obj['dirt'] = loader.addImage('assets/background/dirt.png');
    obj['arrows'] = loader.addImage('assets/background/arrows.png');
    obj['small_rocks'] = loader.addImage('assets/background/small_rocks.png');

    // house
    obj['blacksmith'] = loader.addImage('assets/background/blacksmith.png');
    obj['mayor'] = loader.addImage('assets/background/mayor.png');
    obj['inn'] = loader.addImage('assets/background/inn.png');

    // trees
    obj['small_tree'] = loader.addImage('assets/background/small_tree.png');
    obj['big_tree'] = loader.addImage('assets/background/big_tree.png');
    obj['stump'] = loader.addImage('assets/background/stump.png');

    obj['ancient_dark'] = loader.addImage('assets/background/ancient_dark.png');

    // ancient
    obj['ancient_trees'] = loader.addImage('assets/background/ancient_trees.png');
    obj['ancient_tree'] = loader.addImage('assets/background/ancient_tree.png');
    obj['ancient_base'] = loader.addImage('assets/background/ancient_base.png');
    obj['ancient_door'] = loader.addImage('assets/background/ancient_door.png');
    obj['ancient_dirt'] = loader.addImage('assets/background/ancient_dirt.png');

    obj['ancient_grass'] = loader.addImage('assets/background/ancient_grass.png');
    obj['ancient_mushrooms'] = loader.addImage('assets/background/ancient_mushrooms.png');
    obj['ancient_pebbles'] = loader.addImage('assets/background/ancient_pebbles.png');

    // images
    obj['mask'] = loader.addImage('assets/images/mask.png');

    // elizabeth walk
    obj['elizabeth_walk'] = loader.addImage('assets/images/elizabeth_walk.png');

    // objects
    obj['barrel'] = loader.addImage('assets/background/barrel.png');
    obj['pot'] = loader.addImage('assets/images/pot.png');

    obj['fountain'] = loader.addImage('assets/images/fountain.png');
    obj['cart'] = loader.addImage('assets/images/cart.png');

    // blacksmith
    obj['blacksmith_floor'] = loader.addImage('assets/background/blacksmith_floor.png');
    obj['blacksmith_rock_floor'] = loader.addImage('assets/background/blacksmith_rock_floor.png');
    obj['blacksmith_weapons'] = loader.addImage('assets/background/blacksmith_weapons.png');
    obj['blacksmith_wall'] = loader.addImage('assets/background/blacksmith_wall.png');
    obj['blacksmith_stone_wall'] = loader.addImage('assets/background/blacksmith_stone_wall.png');

    obj['black'] = loader.addImage('assets/background/cave_dark.png');
    obj['forge'] = loader.addImage('assets/background/forge.png');
    obj['anvil'] = loader.addImage('assets/background/anvil.png');
    obj['blacksmith_rug'] = loader.addImage('assets/background/blacksmith_rug.png');
    obj['blacksmith_bed'] = loader.addImage('assets/background/blacksmith_bed.png');

    obj['adam'] = loader.addImage('assets/images/adam.png');
    obj['vignette'] = loader.addImage('assets/background/vignette.png');

    // battle
    obj['battle_foreground'] = loader.addImage('assets/background/battle_foreground.png');
    obj['battle_grass_front'] = loader.addImage('assets/background/battle_grass_front.png');
    obj['battle_mountain'] = loader.addImage('assets/background/battle_mountain.png');
    obj['battle_sky'] = loader.addImage('assets/background/battle_sky.png');
    obj['battle_tree_back'] = loader.addImage('assets/background/battle_tree_back.png');
    obj['battle_tree_background'] = loader.addImage('assets/background/battle_tree_background.png');
    obj['battle_tree_foreground'] = loader.addImage('assets/background/battle_tree_foreground.png');
    obj['battle_zone'] = loader.addImage('assets/background/battle_zone.png');

    obj['info_bar'] = loader.addImage('assets/images/info_bar.png');
    obj['health_bar'] = loader.addImage('assets/images/health_bar.png');
    obj['action_meter'] = loader.addImage('assets/images/action_meter.png');

    obj['battle_ui_frame'] = loader.addImage('assets/images/battle_ui_frame.png');
    obj['battle_ui_action'] = loader.addImage('assets/images/battle_ui_action.png');
    obj['battle_ui_item'] = loader.addImage('assets/images/battle_ui_item.png');
    obj['battle_ui_run'] = loader.addImage('assets/images/battle_ui_run.png');

    obj['battle_shine'] = loader.addImage('assets/images/battle_shine.png');

    obj['textbox'] = loader.addImage('assets/images/textbox.png');
    obj['a_z'] = loader.addImage('assets/images/a_z.png');
    obj['A_Z'] = loader.addImage('assets/images/A_Z_cap.png');
    obj['zero_nine'] = loader.addImage('assets/images/0_9.png');
    obj['special_characters'] = loader.addImage('assets/images/special_characters.png');
    obj['caret'] = loader.addImage('assets/images/caret.png');

    obj['elizabeth_idle'] = loader.addImage('assets/images/elizabeth_idle.png');
    obj['elizabeth_approach'] = loader.addImage('assets/images/elizabeth_approach.png');
    obj['elizabeth_attack'] = loader.addImage('assets/images/elizabeth_attack.png');
    obj['elizabeth_hit'] = loader.addImage('assets/images/elizabeth_hit.png');
    obj['elizabeth_return'] = loader.addImage('assets/images/elizabeth_return.png');
    obj['elizabeth_ranged'] = loader.addImage('assets/images/elizabeth_ranged.png');
    obj['elizabeth_item'] = loader.addImage('assets/images/elizabeth_item.png');
    obj['elizabeth_run'] = loader.addImage('assets/images/elizabeth_run.png');


    obj['spider_idle'] = loader.addImage('assets/images/spider_idle.png');
    obj['spider_approach'] = loader.addImage('assets/images/spider_approach.png');
    obj['spider_attack'] = loader.addImage('assets/images/spider_attack.png');
    obj['spider_hit'] = loader.addImage('assets/images/spider_hit.png');
    obj['spider_return'] = loader.addImage('assets/images/spider_return.png');

    obj['shield'] = loader.addImage('assets/images/shield.png');
    obj['sonar'] = loader.addImage('assets/images/sonar.png');

    obj['levelup_bar'] = loader.addImage('assets/images/levelup_bar.png');
    obj['levelup_arrow'] = loader.addImage('assets/images/levelup_arrow.png');

    return obj;
};

var imageMap = createImageMap();