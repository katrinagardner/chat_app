// var ws = new WebSocket("ws://localhost:3000");
// var body=document.querySelector("body");
// var ul=document.createElement("ul");
// body.appendChild(ul);
//
// var input=document.querySelector("#input");
// var button=document.querySelector("#button");
// body.appendChild(input);
// body.appendChild(button);
// var name = window.prompt("Please enter your name?").trim();
// var userColor = prompt("pick a color for your text");
//
// var addText=function(msg){
//   var newLi=document.createElement("li");
//   newLi.innerHTML=msg;
//   newLi.style.color = userColor.color;
//   var firstli=ul.firstChild;
//   //ul.insertBefore(newLi,firstli);
//   var ula=document.querySelector("ul");
//   ula.appendChild(newLi);
// }
// ws.addEventListener("open", function(evt) {
//   //addText("connected");
//   console.log('connected');
// });
//
// ws.addEventListener("message", function(evt) {
//   addText(evt.data)
//   console.log(evt.data);
// });
//
// button.addEventListener("click",function(){
//   var hash = {name:name};
//   hash["words"] = input.value;
//   var messagecontent = JSON.stringify(hash);
//   ws.send(messagecontent);
//   input.value=" ";
//   });
//
// input.addEventListener("keydown",function(evt){
//   if(evt.keyCode === 13 ){
//     var hash = {name:name};
//     hash["words"] = input.value;
//     var messagecontent = JSON.stringify(hash);
//     ws.send(messagecontent);
//     input.value=" ";
//   }
// });


//new code

var ws = new WebSocket("ws://katrina.princesspeach:3000"); //ws:katrina.princesspeach.nyc:3000


var body = document.querySelector("body");
var ul = document.createElement("ul");
body.appendChild(ul);
var userName = prompt("Please enter your name").trim();
var userColor = prompt("pick a color for your text");


ws.addEventListener("open", function(evt){
    var addText = function(msg){
      var newli = document.createElement("li");
      var mssg = JSON.parse(msg); //unpack the message
      var printMessage = mssg.name + ": " + mssg.newMessage; //after unpack message and print.
      console.log(mssg);
      newli.style.color = mssg.color;//color for each user.
      newli.innerHTML = printMessage;
      var firstli = ul.firstChild;
      //ul.insertBefore(newli, firstli);
      var ula=document.querySelector("ul");
      ula.appendChild(newli);
      var textarea=document.querySelector("textarea");
      body.insertBefore(ula,textarea);
    }

  ws.addEventListener("message", function(evt){
    addText(evt.data);
    //console.log(evt.data);
  });

  button.addEventListener("click", function(evt){
    var inputStr = document.querySelector("#input");//can work by using #button as well.
    var userMessage = {name: userName, newMessage: inputStr.value, color: userColor};
    var info = JSON.stringify(userMessage); //pack the message
    ws.send(info);
    input.value = " ";
  });

  input.addEventListener("keydown", function(evt){
    if(evt.keyCode === 13){
      var inputStr = document.querySelector("#input");
      var userMessage = {name: userName, newMessage: inputStr.value, color: userColor};
      var info = JSON.stringify(userMessage);
      ws.send(info);
      input.value = " ";
    }
  });
  });
