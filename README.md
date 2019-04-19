# Chatter Server

An expanded version of the socket.io [Getting Started](http://socket.io/get-started/chat/) project.

### Getting Started

To view the project you must:

* Install all project dependencies with `yarn install`
* Start the Node server with `node server`
* Start the client (see Client section)

### Client

Download and run the client found here [Chatter Client](https://github.com/jeanmarcjones/chatter)

### Todo

- [x] Broadcast a message to connected users when someone connects or disconnects
- [x] Add support for nicknames
- [x] Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
- [ ] Add “{user} is typing” functionality
- [ ] Show who’s online
- [ ] Add private messaging
- [x] Create frontend with react
- [ ] Store messages on the server?
- [ ] Make users an array of objects?
