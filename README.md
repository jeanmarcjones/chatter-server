# Chatter Server

An expanded version of the socket.io [Getting Started](http://socket.io/get-started/chat/) project.

### Usage

Run these commands to get started:

* `npm install`
* `node server`

### Todo

- [x] Broadcast a message to connected users when someone connects or disconnects
- [ ] Add support for nicknames
- [ ] Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
- [ ] Add “{user} is typing” functionality
- [ ] Show who’s online
- [ ] Add private messaging
- [ ] Create frontend with react