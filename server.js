import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8081});

wss.on("connection", (ws, client) => {
  console.log(`Client connected from IP ${ws._socket.remoteAddress}`);
  console.log(`Number of connected clients: ${wss.clients.size}`);

  ws.on("close", () => {
    console.log("Client disconnected\n");
  });

  ws.on("message", (data) => {
    let state = JSON.parse(data);
    console.log(`Received message ${data} from user ${client}`);
    wss.clients.forEach((client) => client.send(JSON.stringify(state)));
   // wss.clients.forEach(function each(client) {
      //if (client !== ws && client.readyState === WebSocket.OPEN) {
      //  client.send(data, { binary: isBinary });
    //startGameLoop(state);
  });
})
/*
function startGameLoop(state){
  const intervalId = setInterval(() => {
    state.player = gameLoop(state);
    //console.log(state.player);
    wss.clients.forEach((client) => client.send(JSON.stringify(state)));

   /* if(!winner) {
      wss.clients.forEach((client) => client.send(JSON.stringify(state)));
    }
    else {
      wss.clients.forEach((client) => client.send('Game Over'));
      clearInterval(intervalId);
    } 

  }, 500);
}

function gameLoop(state){
  if(!state) return;

  let playerOne = state.player;
  //console.log(playerOne);

  playerOne.pos.x += playerOne.vel.x; 
  playerOne.pos.y += playerOne.vel.y;

  if(playerOne.pos.x < 0 || playerOne.pos.x > 20 || playerOne.pos.y < 0 || playerOne.pos.y > 20){
    return 2;
  }

  if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y)
  {
    playerOne.snake.push({...playerOne.pos});
    playerOne.pos.x += playerOne.vel.x; 
    playerOne.pos.y += playerOne.vel.y;
    createFood(state);
  }

  if (playerOne.vel.x || playerOne.vel.y){
    for(let cell of playerOne.snake){
      if(cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) return 2;
    }
  
    playerOne.snake.push({...playerOne.pos});
    playerOne.snake.shift();
  
  }
return playerOne;
}

function createFood(state){
  food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  }

  for(let cell of state.player.snake){
    if(cell.x === food.x && cell.y === food.y) return createFood(state);
  }

  state.food = food;
} 

  */