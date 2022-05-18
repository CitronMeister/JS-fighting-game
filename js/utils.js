function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
      rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
  }
  function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display = 'flex';
    if(player.health === enemy.health){
      console.log("TIE");
      document.querySelector('#displayText').innerHTML = 'Tie';
    } else if(player.health > enemy.health){
      console.log("PLAYER WINS!");
      document.querySelector('#displayText').innerHTML = 'Player 1 Wins!';
    } else if(player.health < enemy.health){
      console.log("Enemy Wins");
      document.querySelector('#displayText').innerHTML = 'Player 2 Wins!';
    }
  }



let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    document.querySelector('#displayText').style.display = 'flex';
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  
  
  if (timer === 0) {    
    determineWinner({player, enemy, timerId});
  }
}


// prevents anti-aliazing in the following browsers
function setpixelated(context){
  context['imageSmoothingEnabled'] = false;       /* standard */
  context['mozImageSmoothingEnabled'] = false;    /* Firefox */
  context['oImageSmoothingEnabled'] = false;      /* Opera */
  context['webkitImageSmoothingEnabled'] = false; /* Safari */
  context['msImageSmoothingEnabled'] = false;     /* IE */
}
setpixelated(canvas.getContext('2d'));