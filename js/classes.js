class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1, framesHold, offset = {x: 0, y: 0}}) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = framesHold;
    this.offset = offset;
  }
  draw() {
    c.drawImage(
      this.image,
    // position of current frame  
      this.currentFrame * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
    // position of image
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      this.image.width / this.framesMax * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames(){
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0){
        if(this.currentFrame < this.framesMax - 1){ // - 1 is important else it wont work properly
            this.currentFrame++;
        } else{
            this.currentFrame = 0;
        }
    } 
  }

  update() {

    this.draw();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({ 
    position,
    velocity,
    color,
    imageSrc,
    scale = 1,
    framesMax = 1,
    framesHold,
    offset = {x: 0, y: 0}
  }) {    
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      framesHold,
      offset
    })

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.currentFrame = 0;
    this.framesElapsed = 0;
  }

  update() {
    this.draw();
    this.animateFrames();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - 96.5
    ) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
