const scene_w = 640;
const scene_h = 480;

let preload = () => {
  
}

let create = () => {
  this.load.image("background", "stars.jpg");
  this.load.image("character", "hip.png);
}

let update = () => {

}

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
		preload: preload,
		create: create,
		update: update
	}
};

let game = new Phaser.Game(config);
