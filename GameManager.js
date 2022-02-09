// Simple game manager data class with init, update, and show functions.

class GameManager {
  constructor(init, update, show) {
    this.init = init;
    this.update = update;
    this.show = show;
  }
}