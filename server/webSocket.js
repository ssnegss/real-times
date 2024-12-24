const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();
app.use(cors());

const PORT = 5000;

const wss = new WebSocket.Server(
   {
      port: PORT,
   },
   () => {
      console.log(`Server started on port ${PORT}`);
   }
);

wss.on("connection", (ws) => {
   ws.on("message", (message) => {
      message = JSON.parse(message);
      switch (message.event) {
         case "connection":
            broadcastMessage(message);
            break;
         case "message":
            broadcastMessage(message);
            break;
      }
   });
});

const broadcastMessage = (message) => {
   wss.clients.forEach((client) => {
      client.send(JSON.stringify(message));
   });
};
