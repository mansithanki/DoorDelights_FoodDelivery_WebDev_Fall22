let SOCKETIO;

module.exports = {
  init: (httpServer) => {
    SOCKETIO = require("socket.io")(httpServer);
    return SOCKETIO;
  },
  getIO: () => {
    if (!SOCKETIO) {
      throw new Error("SOCKET.IO NOT INITIALIZED");
    }
    return SOCKETIO;
  },
};
