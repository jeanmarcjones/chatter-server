# Chatter Server

An expanded version of the socket.io [Getting Started](http://socket.io/get-started/chat/) project.

### Usage

Run these commands to get started:

* `yarn install`
* `node server`

Download and run the client found here [Chatter Client](https://github.com/jeanmarcjones/chatter)

### Todo

- [ ] Broadcast a message to connected users when someone connects or disconnects
- [x] Add support for nicknames
- [ ] Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
- [ ] Add “{user} is typing” functionality
- [ ] Show who’s online
- [ ] Add private messaging
- [x] Create frontend with react