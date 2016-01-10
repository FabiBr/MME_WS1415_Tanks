
Crafty.load(['assets/16x16_forest_1.gif'], function() {
    // Once the image is loaded...

    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    // to remind us that they simply cause the entity
    // to be drawn with a certain sprite
    Crafty.sprite(16, 'assets/16x16_forest_1.gif', {
        spr_tree: [0, 0],
        spr_bush: [1, 0],
        spr_village: [0, 1],
        spr_player: [1, 1]
    });
})
