const scene_w = 640;
const scene_h = 480;

const config = {
	type: Phaser.CANVAS,
	width: scene_w,
	height: scene_h,
    pixelArt: true,
    physics:{
        default:'arcade',
        arcade:{
            debug:true,
            gravity:{ x: 10 }
        }
    },
	scene: {
		preload: precarga,
		create: crear,
		update: actualiza
	}
};

let game = new Phaser.Game(config);