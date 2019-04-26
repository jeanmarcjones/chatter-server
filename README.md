# Chatter Server

The back-end server for a [chat room app](https://github.com/jeanmarcjones/chatter). This project was inspired by the 
socket.io [getting started](http://socket.io/get-started/chat/) project.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Getting started

To view the project you must:

* Install all project dependencies with `yarn install`
* Start the Node server with `node server`
* Start the client (see Client section)

You may use `npm` instead of `yarn` to install the dependencies.

### Client

Download and run the client found here [Chatter Client](https://github.com/jeanmarcjones/chatter)

### TODO

- [x] Broadcast a message to connected users when someone connects or disconnects
- [x] Add support for nicknames
- [x] Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
- [ ] Add “{user} is typing” functionality
- [ ] Show who’s online
- [ ] Add private messaging
- [x] Create frontend with react
- [ ] Store messages on the server?
- [ ] Make users an array of objects?
