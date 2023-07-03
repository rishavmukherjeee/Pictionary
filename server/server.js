const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

// Store the paths data
let savedPaths = [];

io.on('connection', (socket) => {
  console.log('A client connected');

  // Send the current savedPaths data to the newly connected client
  socket.emit('dataUpdated', savedPaths);

  socket.on('dataUpdate', (updatedPaths) => {
    // Update the savedPaths with the received data
    savedPaths = updatedPaths;

    // Broadcast the updated paths to all connected clients
    io.emit('dataUpdated', savedPaths);
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
