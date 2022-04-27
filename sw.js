// importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
  console.log("%cInstalling Progressive Web App (PWA)", "color: purple;");
  e.waitUntil(
    caches.open('p5js-tetrominoes').then(function(cache) {
      return cache.addAll([
        "./icon.png",
        "./index.html",
        "./LICENSE.txt",
        "./manifest.json",
        "./README.md",
        "./showdown.js",
        "./sw.js",
        "./p5js-tetrominoes/game.html",
        "./p5js-tetrominoes/assets/Roboto-Regular.ttf",
        "./p5js-tetrominoes/lib/p5.min.js",
        "./p5js-tetrominoes/lib/scenemanager.js",
        "./p5js-tetrominoes/src/GameManager.js",
        "./p5js-tetrominoes/src/GameOver.js",
        "./p5js-tetrominoes/src/Matrix.js",
        "./p5js-tetrominoes/src/Menu.js",
        "./p5js-tetrominoes/src/PositionedTetromino.js",
        "./p5js-tetrominoes/src/RS.js",
        "./p5js-tetrominoes/src/ScoringMessage.js",
        "./p5js-tetrominoes/src/sketch.js",
        "./p5js-tetrominoes/src/SRS.js",
        "./p5js-tetrominoes/src/Tetromino.js",
        "./p5js-tetrominoes/src/WinCondition.js"
      ]);
    })
  );
  console.log("%cProgressive Web App (PWA) Successfully Installed", "color: green;");
});

self.addEventListener('fetch', function(event) {
  event.respondWith(async function() {
    try{
    let res = await fetch(event.request);
      let cache = await caches.open('cache');
      cache.put(event.request.url, res.clone());
      return res;
    }
    catch(error){
      return caches.match(event.request);
    }
  }());
});