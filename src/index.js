const path = require('path');
const express = require('express');
const socketio = require('socket.io')
const http = require('http');
const jsonRpcTwo = require('./jsonRpcTwo');

// Constants
const WEBSOCKET_PORT = 18189;

// Global objects
const expressServer = express();
const httpServer = http.createServer(expressServer);
const websocketServer = socketio(httpServer, {
  path: '/rpc',
});

httpServer.listen(WEBSOCKET_PORT, function() {
  console.log('Listening on port ' + WEBSOCKET_PORT);

  websocketServer.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('JSON RPC 2.0', function(data) {
      var obj = jsonRpcTwo.parseJsonRpcTwo(data);
      if (obj.getType() == 'Request') {
        console.log('Got method ' + obj.method);
        if (obj.method == 'ping') {
          let response = new jsonRpcTwo.Response();
          response.result = 'pong';
          response.id = obj.id;
          socket.emit(jsonRpcTwo.toJsonTwo(response));
        } else if (obj.method == 'add') {
          let operand_a = obj.params.operand_a;
          let operand_b = obj.params.operand_b;
          let response = new jsonRpcTwo.Response();
          response.result = operand_a + operand_b;
          response.id = obj.id;
          socket.emit(jsonRpcTwo.toJsonTwo(response));
        }
      }
    });
  });
});

