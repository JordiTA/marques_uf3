const scene_w = 640;
const scene_h = 480;

let player_init_x = 16;

let bg;
let player;
let enemies = [];
let bullets = [];

let score = 0;
let points;

let up_key;
let down_key;
let space_key;
let can_shoot = true;

const BULLET_INIT_X = -1000;
const BULLET_INIT_Y = -1000;

const MAX_ENEMIES = 128;
const MAX_BULLETS = 3;

const SCREEN_MARGIN = 32;

function preload () {
	
	game = this;

	this.load.image("background", "stars.jpg");
	this.load.image("character", "PNG/Characters/ship.png");
	this.load.image("enemy", "PNG/Characters/rock.png");
	this.load.image("bullet", "PNG/Characters/bullet.png");
}

function create () {
	
	enemies = [];
	bullets = [];

	bg = this.add.image(scene_w/2, scene_h/2, "background");
	player = this.physics.add.image(player_init_x, scene_h/2, "character");
	player.setScale(0.5);	
	player.setAngle(90);



	for (let i = 0; i < MAX_ENEMIES; i++){
		let x = Math.random()*scene_w*10 + scene_w/2;
		let y = Math.random()*scene_h;

	 	enemies.push(this.physics.add.image(x, y, "enemy"));
		enemies[i].setScale(0.5);
		this.physics.add.collider(this.enemies);
	}

	enemies.forEach(function(element){
		game.physics.add.overlap(player, element, function(p,e){
			game.scene.restart();
		},null, game);
	});

	for (let i = 0; i < MAX_BULLETS; i++){
		bullets.push(this.physics.add.image(BULLET_INIT_X, BULLET_INIT_Y, "bullet"));

		bullets[i].moving = false;
	}

	enemies.forEach(function(object){
		game.physics.add.overlap(enemies,object,function(e,b){
			element.x = BULLET_INIT_X;
			element.y = BULLET_INIT_Y;
			element.moving = false;
			
			score++;
			
			e.destroy();

		},null,game);
	});

	up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
	down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
	space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


}


function update () {
	if (up_key.isDown){
		player.y--;
	}
	else if (down_key.isDown){
		player.y++;
	}

	if(space_key.isUp){
		can_shoot = true;
	}
	if (space_key.isDown && can_shoot){
		let found = false;

		can_shoot = false;

		for (let i = 0; i < MAX_BULLETS && !found; i++){
			if (!bullets[i].moving){
				bullets[i].moving = true;
				bullets[i].x = player.x;
				bullets[i].y = player.y;

				found = true;
			}
		}
	}


	for (let i = 0; i < MAX_BULLETS; i++){
		if (bullets[i].moving){
			bullets[i].x++;

			if (bullets[i].x >= scene_w + SCREEN_MARGIN){
				bullets[i].x = BULLET_INIT_X;
				bullets[i].y = BULLET_INIT_Y;

				bullets[i].moving = false;
			}
		}
	}

	for (let i = 0; i < MAX_ENEMIES; i++){
		enemies[i].x--;
	}
}

const config = {
	type: Phaser.CANVAS,
	width: scene_w,
	height: scene_h,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug:true,
//			gravity: { x: 10 }
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

let game = new Phaser.Game(config);
