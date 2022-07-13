# requirements

## description

Vertiges is a system for message delivery composed of three parts: an audience app, a performer app, and a web interface.

The __audience app__ is a one-to-many messaging application, used in the context of a live performance. Members of the audience download the app before the show, and received messages on the app throughout the show and send messages back to a remote web backend. At the end of the show, users will have access to additional content on the app. The user can also browse pre-defined media on the app.

The __performer app__ allows the performer to keep track of which cues are being sent to the audience, and of how the show unfolds.

These two apps are controlled by a separate __web interface__ which orchestrates what happens on them. It can send cues for series of messages to be sent, and it can see what messages are being sent back by the audience app (async two-way data exchange). The web interface can also send information to the performer app (async one-way exchange).

Audience members will use the app:
- before the show, to learn more about the show.
- during the show, to receive messages and send messages.
- during the show, to explore the profile of the user of the app.
- after the show, to explore the unlocked content.

There should be a clear separation between content and display: all of the information that is being displayed during the show is from the web interface, and not stored in the app.

## functional components

### audience app

- can open the app, with a home view, a message view and a profile view.
- can display notifications when new messages come in if the app is in background mode.
- can display or playback media content decided from a remote server.
- can display messages sent by the interface.
- can playback audio sent by the interface.

### performer app

- can see the state of the show (messages currently being sent and received)
- can see which cue is next
- (optional) can send cues from the app

### admin interface

- can send cues to each connected app.
- - cue type 1: start of the show
- - cue type 2: series of messages (messages are always divided in two parts: beginning of the scene, and end of the scene)
- - cue type 3: end of the show
- can see what are the messages sent from the connected apps to the performer.

## external requirements

- should work with native notification systems (FCN, APNS)
- should be compatible at least on Android and Apple
- should be able to update the messages and media being sent via file edit such as JSON or YAML (possibly via FTP or SSH)