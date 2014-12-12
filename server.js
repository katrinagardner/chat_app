// var Websocket = require("ws").Server;
// var server = new Websocket({port:3000});
// var clients = [];
// var history= [];
// server.on("connection", function(ws){
//   clients.push(ws);
//   clients.forEach(function(client){
//     client.send("Client connected!");
//   })
//   for (i=0;i<history.length;i++){
//     ws.send(history[i]);
//   }
//   var history1 = history.join("\n");
//   ws.send(history1);
//
//
//   console.log(clients.length+" clients are in the room");
//
//   ws.on("message",function(message){
//     var hash=JSON.parse(message);
//     history.push(hash.name + " : " + hash.words);
//     console.log(hash.name + " : " + hash.words);
//
//     //console.log(message);
//     for (i=0;i<clients.length;i++){
//         clients[i].send(hash.name + " : " + hash.words);
//       }
//     })
//
//     ws.on("close",function(){
//
//       var x = clients.indexOf(ws);
//       clients.splice(x,1);
//       console.log(clients.length+" clients are  still in the room");
//       clients.forEach(function(client)
//       {
//         client.send("Oh no, someone left!");
//
//       })
//     })
//   })

//new code


var wss = require("ws").Server;
var server = new wss({port:3000});
var clients = [];
var history = [];
server.on("connection", function(ws){
  if (history.length > 0) {
    history.forEach(function(msgz) {
      ws.send(msgz);
    })
  }
  clients.push(ws);
  clients.forEach(function(client){
    var servermsg = {name:"server", newMessage:"client connected!", color: "black"};
    var J_servermsg= JSON.stringify(servermsg);
    client.send(J_servermsg);

  })
    console.log(clients.length +" clients are in the room");

    ws.on("close", function(){
      var x = clients.indexOf(ws);
      clients.splice(x, 1);

      clients.forEach(function(client){
      var servermsg1 = {name:"server", newMessage:"Oh no, someone left!", color: "black"};
      var J_servermsg1= JSON.stringify(servermsg1);
      client.send(J_servermsg1);
   })

 });

    ws.on("message", function(msg){
      history.push(msg);
      console.log(msg);
      for(i=0; i<clients.length; i++){
        clients[i].send(msg);
      }
    //   var badword=JSON.parse(msg);
    //   var bad= badword.userMessage;
    //   if(bad === "fuck" || bad === "ass"){
    //     clients.forEach(function(client){
    //     var serverword = {name:"server", newMessage:"NO cursing in the chat room", color: "black"};
    //     var J_serverword= JSON.stringify(serverword);
    //     client.send(J_serverword);
    //     console.log("This is bad word.")
     //
    //   })
    //     ws.close();
    //  }

    })
    });
