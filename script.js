let gameState = {
  player: {
    pos: {
      x: 3,
      y: 10,
    },
    vel: {
      x: 1,
      y: 0,
    },
    snake: [
      {x: 1, y: 10},
      {x: 2, y: 10},
      {x: 3, y: 10},
    ],
  },
  food: {
    x: 7,
    y: 7,
  },
  gridsize: 20,
};



function init(e) {
  const canvas = document.querySelector("#canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  console.log('This is the context', ctx);
  
  
  function paintGame(state){
    ctx.reset();
    document.addEventListener('keydown', keydown);
    console.log(gameState.player.vel.x, gameState.player.vel.y);
    const food = state.food;
    const gridsize = state.gridsize;
    const size = 25;
  
    ctx.fillStyle = 'blue';
    ctx.fillRect(food.x * size, food.y * size, size, size);

    paintPlayer(state.player, size, 'green');
  }
  
  function paintPlayer(playerState, size, colour){
    let snake = playerState.snake;
    ctx.fillStyle = colour;
    for (let cell of snake){
      ctx.fillRect(cell.x * size, cell.y * size, size, size);
    }
  }

  const websocket = new WebSocket('ws://localhost:8081');

 
  const handleSocketOpen = (e) => {
    console.log('Socket has been opened');
    websocket.send(JSON.stringify(gameState));
  };
  const handleSocketMessage = (stateOfGame) => {
    gameState = JSON.parse(stateOfGame.data);
    console.log(gameState);
    requestAnimationFrame(() => paintGame(gameState));
  };
  
  websocket.onopen = handleSocketOpen;
  websocket.onmessage = handleSocketMessage;

  function  keydown(e){
    console.log(e.keyCode);
    if(e.keyCode === 38){
      gameState.player.vel.x = 0;
      gameState.player.vel.y = -1;
      websocket.send(JSON.stringify(gameState));
    }
  }
  paintGame(gameState);
}







window.onload = init;