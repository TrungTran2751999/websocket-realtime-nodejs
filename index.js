const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({server});
wss.on('connection', function connection(ws) {
    console.log(ws)
    console.log("Are new client connected")
    ws.send('Welcome New Client');

    ws.on('message', function message(data) {
      console.log('received: %s', data);
      ws.send("Got you msg its: "+data);
    });

    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
          }
        });
    });

    ws.on('close', (data)=> {
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
    });
  
  });

app.get("/", (req,res)=>res.send("Hello World"))
server.listen(3000, ()=>console.log("Server listening on port: 3000"))
