# Video.js | Player Skin Designer

(A fork of [Less2CSS](https://github.com/brian-frichette/less-preview/) by Brian Frichette.)

[Video.js](http://www.videojs.com) is a web video player that uses HTML and CSS to build the player controls and other player elements. The CSS of the player is referred to as the "skin", and it can be edited just like any other CSS.

The Player Skin Designer allows anyone to edit the CSS of the player, live, to design custom skins. It uses [LESS](http://lesscss.org/), a popular CSS pre-processor, to make editing the CSS a little easier.

### Requirements for building & running

- [Node.js](http://nodejs.org/)
- [MongoDB](http://www.mongodb.org/) (coming soon)

### Building

1. Install [grunt-cli](https://github.com/gruntjs/grunt/wiki/Getting-started): `$ [sudo] npm install -g grunt-cli`.
2. Install [express](http://expressjs.com/): `$ [sudo] npm install -g express`
3. Install dependencies *(from root project folder)*: `$ npm install`
4. Run [Grunt](http://gruntjs.com/) *(from root project folder)*: `$ grunt`
5. Start the app: `$ npm start`. This will start the app on http://localhost:3000/. [Nodemon](https://github.com/remy/nodemon) will restart the server automatically when it detects a change.
6. Open a new terminal tab or window and start the [watcher](https://github.com/gruntjs/grunt-contrib-watch) task: `$ grunt watch`. This will compile coffee-script to js, run [jshint](http://jshint.com/) on the output, and [minify](https://github.com/mishoo/UglifyJS) the files, and run all unit tests.

### Video.js Release Process

Update to the latest version of video.js
```
grunt release
```

Publish the changes
```
grunt deploy
```

---
Please feel free to contribute or suggest features and improvements.