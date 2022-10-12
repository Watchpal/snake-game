import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8081});

let state = {
  player1: {
    newHead:  {
      x : 3,
      y : 10,
    },
    d: "RIGHT",
    snake: [
      {x: 3, y: 10},
      {x: 2, y: 10},
      {x: 1, y: 10},
    ],
  },
  player2: {
    newHead:  {
      x : 15,
      y : 5,
    },
    d: "DOWN",
    snake: [
      {x: 15, y: 5},
      {x: 15, y: 4},
      {x: 15, y: 3},
    ],
  },
  food: {
    x: 1,
    y: 1
  },
};

let idset = 1;

wss.on("connection", (ws, client) => {
  console.log(`Client connected from IP ${ws._socket.remoteAddress}`);
  console.log(`Number of connected clients: ${wss.clients.size}`);
  //if(wss.clients.size === 2) {game = setInterval(sendInfo,1000);}
  
  ws.id = idset;
  idset++;
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({ type: "id", payload: client.id }));
});

  ws.on("close", () => {
    console.log("Client disconnected\n");
  });

  

  ws.on("message", (data) => {
    let message = JSON.parse(data);
    switch(message.type){
      case "gameLogic1":
        let initGameLogic1 = message.payload;
        state.player1 = initGameLogic1.first;
        break;
        case "gameLogic2":
          let initGameLogic2 = message.payload;
          state.player2 = initGameLogic2.first;
          break;
        case "sendFood":
          let newFood = message.payload;
          state.food = newFood;
          break;
        case "end":
          clearInterval(game);
          break;
          

    }
    //state = JSON.parse(data);
    //console.log(`Received message ${data} from user ${client}`);
    
    
    
    

    //if(state.player.newHead.x < 0 || state.player.newHead.x > 20 || state.player.newHead.y < 0 || state.player.newHead.y > 20 || (state.player.d != null && collision(state.player.newHead,state.player.snake))){
   //     clearInterval(game);
        
    //}
   
   // function collision(head,array){
     // for(let i = 0; i < array.length; i++){
       //   if(head.x == array[i].x && head.y == array[i].y){
         //     return true;
          //}
      //}
        //return false;
      //}
   // wss.clients.forEach(function each(client) {
      //if (client !== ws && client.readyState === WebSocket.OPEN) {
      //  client.send(data, { binary: isBinary });
    //startGameLoop(state);
  });

  





})
function sendInfo() {
  //console.log(state);
  wss.clients.forEach((client) => client.send(JSON.stringify(state)));
}

let game = setInterval(sendInfo,1000);
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