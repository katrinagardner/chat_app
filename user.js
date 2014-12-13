var ws = new WebSocket("ws://katrina.princesspeach.nyc:3000"); //ws://katrina.princesspeach.nyc:3000
var body = document.querySelector("body");
var ul = document.createElement("ul");
body.appendChild(ul);
var userName = prompt("Please enter your name").trim();
var userColor = prompt("Type the name of the color for your text");

var addText = function(msg){
  var newli = document.createElement("li");
  var mssg = JSON.parse(msg); //unpack the message
  var printMessage = mssg.name + " : " + mssg.newMessage; //after unpack message and print.
  console.log(mssg);
  newli.style.color = mssg.color;//color for each user.
  newli.innerHTML = printMessage;
  var firstli = ul.firstChild;
  //ul.insertBefore(newli, firstli);
  var ula=document.querySelector("ul");
  ula.appendChild(newli);
  ula.scrollTop = ula.scrollHeight; // this will make new text show without scroll down.
  var textarea=document.querySelector("textarea");
  body.insertBefore(ula,textarea);

}

ws.addEventListener("open", function(evt){

      console.log('connected');
    // var addText = function(msg){
    //   var newli = document.createElement("li");
    //   var mssg = JSON.parse(msg); //unpack the message
    //   var printMessage = mssg.name + ": " + mssg.newMessage; //after unpack message and print.
    //   console.log(mssg);
    //   newli.style.color = mssg.color;//color for each user.
    //   newli.innerHTML = printMessage;
    //   var firstli = ul.firstChild;
    //   //ul.insertBefore(newli, firstli);
    //   var ula=document.querySelector("ul");
    //   ula.appendChild(newli);
    //   ula.scrollTop = ula.scrollHeight; // this will make new text show without scroll.
    //   var textarea=document.querySelector("textarea");
    //   body.insertBefore(ula,textarea);
    // }

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

//link
//   var link = document.createElement("a");
//   var linkStr=document.querySelector("#input");
//   var userlink = {name: userName, newMessage:linkStr.value, color: userColor};
//   link.setAttribute("href",userlinks);
//   var info1 = JSON.stringify(userlink); //pack the message
//   ws.send(info1);
//   link.value = " ";

  });


  input.addEventListener("keydown", function(evt){
    if(evt.keyCode === 13){
      var inputStr = document.querySelector("#input");
      var userMessage = {name: userName, newMessage: inputStr.value, color: userColor};
      var info = JSON.stringify(userMessage);//pack the message
      ws.send(info);
      input.value = " ";
    }
  });
  });
