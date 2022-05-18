const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// windows size
canvas.width = 1024;
canvas.height = 576;

// entity movementspeed
const movementSpeed = 5;
// gravity constant
const gravity = 0.7;

c.fillRect(0, 0, canvas.width, canvas.height);



const background = new Sprite({
  position:{
    x: 0,
    y: 0
  },
  imageSrc: '/images/background.png'
})

const shop = new Sprite({
  position:{
    x: 625,
    y: 160
  },
  imageSrc: '/images/shop.png',
  scale: 2.5,
  framesMax: 6,
  framesHold: 9
})
const bird = new Sprite({
  position:{
    x: 340,
    y: 380
  },
  imageSrc: '/images/BirdSheet.png',
  scale: 1,
  framesMax: 30,
  framesHold: 19
})

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 1,
  },
  color: "red",
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: '/images/Martial Hero/Sprites/Idle.png',
  framesMax: 8,
  scale: 2.5,
  framesHold: 10,
  offset: {
    x: 215,
    y: 155,
  }
});

const enemy = new Fighter({
  position: {
    x: 800,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: '/images/Martial Hero/Sprites/Idle.png',
  framesMax: 8,
  scale: 2.5,
  framesHold: 10,
  offset: {
    x: 215,
    y: 155,
  }
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};


decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  bird.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement
  if (keys.a.pressed && player.lastKey === "a" && player.position.x > 0) {
    player.velocity.x = -movementSpeed;
  } else if (keys.d.pressed && player.lastKey === "d" && player.position.x <= canvas.width - 50) {
    player.velocity.x = movementSpeed;
  }

  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft" && enemy.position.x > 0) {
    enemy.velocity.x = -movementSpeed;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight"  && enemy.position.x <= canvas.width - 50) {
    enemy.velocity.x = movementSpeed;
  }
  //detect collision player to enemy
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    console.log("Player Hit!");
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }
  // detect collision enemy to player
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    console.log("Enemy Hit!");
    player.health -= 20;
    document.querySelector("#playerHealth").style.width = player.health + "%";
  }

  // end game if health is below 1
  if (player.health <= 0 || enemy.health <= 0){
    determineWinner({player, enemy, timerId});
  }

}
animate();

//movement
window.addEventListener("keydown", (event) => {
  //player movement
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      keys.w.pressed = true;
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;
  }
  //enemy movement
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      enemy.velocity.y = -20;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});
window.addEventListener("keyup", (event) => {
  //player movement
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }
  // enemy movement
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
});
