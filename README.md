P5.js Tetrominoes
=====

P5.js Tetrominoes is a clone of the more modern version of the popular action-puzzle stacker game involving tetrominoes whose name I will not mention due to copyright reasons. The intracacies of modern versions (versions from 2001 and later) of this tetromino game are baked into the project, meaning if you've ever played one of these modern versions the mechanics of this project should feel the same (with more modern games being more accurate).

I've made a clone of this game before using Python and the Pygame library, which, by the way, you can check out [here](https://github.com/wmpowell8/pygame-tetrominoes), but the code style and maintainability were bad. So, I made a better version, this project, with JavaScript and [p5.js](https://p5js.org). This project originally came out of the final project for the first semester of my Intro to Engineering class, in which we were supposed to learn how to use p5.js. Some parts of this project did end up turning out like the other one, and if I were given a chance to redo this project, I would definitely try to prevent that from happening again.

Some questions you may have:

- > *How do I control the game?*
  
  See "const controls" below.
  ```javascript
  // An Object with the game's controls.
  const controls = {
    translateRight: [39/*right*/],
    translateLeft:  [37/*left*/],
    softDrop:       [40/*down*/],
    hardDrop:       [32/*space*/],
    rotateCW:       [88/*x*/, 38/*up*/],
    rotateCCW:      [90/*z*/],
    rotate180:      [65/*a*/],
    hold:           [16/*shift*/, 67/*c*/],
  
    menuSelect: [13/*enter*/],
    menuDown:   [40/*down*/, 83/*s*/],
    menuUp:     [38/*up*/, 87/*w*/],
    menuLeft:   [37/*left*/, 65/*a*/],
    menuRight:  [39/*right*/, 68/*d*/],
    menuBack:   [27/*esc*/, 8/*backspace*/, 46/*delete*/]
  };
  ```
  
- > *Why is clearing 4 lines at once using the I-tetromino called a "Quad" and not the name of the cloned game like it's supposed to?*
  
  A lot of fangames/clones don't call it the name of the game; I can only assume it's because of copyright reasons.
