

function init(e) {
  const canvas = document.querySelector("#canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  console.log('This is the context', ctx);
  
  const websocket = new WebSocket('ws://localhost:8081');

  const size = 25;

  let snake = [];
  
  snake[0] = {
    x : 9,
    y : 10
};

snake[1] = {
  x : 9,
  y : 11
};

  let food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
  };

  let d = "RIGHT";
console.log(snake[0]);


  function collision(head,array){
  for(let i = 0; i < array.length; i++){
      if(head.x == array[i].x && head.y == array[i].y){
          return true;
      }
  }
    return false;
  }
  
  
  
  
  document.addEventListener("keydown",direction);

  function direction(e){
      let key = e.keyCode;
      if( key == 37 && d != "RIGHT"){
          
          d = "LEFT";
      }else if(key == 38 && d != "DOWN"){
          d = "UP";
          
      }else if(key == 39 && d != "LEFT"){
          d = "RIGHT";
          
      }else if(key == 40 && d != "UP"){
          d = "DOWN";
          
      }
  }


  function draw(){
    ctx.reset();
    console.log(snake);
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x * size, snake[i].y * size,size,size);
        
        
    }
    ctx.fillStyle = 'blue';
    ctx.fillRect(food.x * size, food.y * size, size, size);
    // old head position
    let posX = snake[0].x;
    let posY = snake[0].y;
    
    // which direction
    if( d == "LEFT") posX -= 1;
    if( d == "UP") posY -= 1;
    if( d == "RIGHT") posX += 1;
    if( d == "DOWN") posY += 1;
    
    // if the snake eats the food
    if(posX == food.x && posY == food.y){
        food = {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20)
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : posX,
        y : posY
    }
    
    // game over
    
    if(posX < 0 || posX > 20 || posY < 0 || posY > 20 || collision(newHead,snake)){
        clearInterval(game);
        
    }
    
    snake.unshift(newHead);
    //console.log(snake);
    
}


let game = setInterval(draw,100);


const handleSocketOpen = (e) => {
  console.log('Socket has been opened');
  websocket.send(JSON.stringify(snake));
};
const handleSocketMessage = (stateOfGame) => {
  //gameState = JSON.parse(stateOfGame.data);
  //console.log(gameState);
  //requestAnimationFrame(() => paintGame(gameState));
};

websocket.onopen = handleSocketOpen;
//websocket.onmessage = handleSocketMessage;



}


window.onload = init;