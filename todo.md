# todo

- [ ] app
  - [ ] audio messages
  - [ ] photos
  - [ ] make typing animation
  - [ ] add vibrate on receive
  - [x] reconnect logic
- [ ] setup server
  - [x] setup server sent events (after getting a specific http request, the server sends back SSEs)
    - [x] basic events
    - [x] set up timing
    - [x] send response
  - [ ] setup orchestrator page
    - [x] feature to send messages
    - [x] view voting results
      - [ ] automatically choose next sequence based on voting results
    - [ ] reset voting results
    - [ ] store a trace of each states
    - [x] display all possible messages to be sent
  - [ ] setup performer page