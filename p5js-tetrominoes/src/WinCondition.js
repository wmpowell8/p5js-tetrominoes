/**
 * A class for a condition that is checked every frame to see whether or not you have won the game
 */
class WinCondition {
  /**
   * @param {WinConditionMetCallback} conditionMet A callback function to check whether the win condition has been met
   * @param {WinConditionMessageCallback} generateMessage A callback function to generate the message to be displayed when the condition is met
   */
  constructor(conditionMet, generateMessage) {
    /**
     * @private
     * @type {WinConditionMetCallback}
     */
    this.conditionMet = conditionMet;
    /**
     * @private
     * @type {WinConditionMessageCallback}
     */
    this.generateMessage = generateMessage;
  }

  /**
   * Function that throws a GameOver if the win condition has been met
   * @param {GameManager} game The GameManager object associated with the current game
   * @see GameManager
   * @see GameOver
   */
  assertNotWon(game) {
    if (this.conditionMet(game)) throw new GameOver("You win", this.generateMessage(game));
  }
  
}
/**
 * @callback WinConditionMetCallback
 * @param {GameManager} game The GameManager object associated with the current game
 * @returns {boolean}
 * @see GameManager
 */
/**
 * @callback WinConditionMessageCallback
 * @param {GameManager} game The GameManager object associated with the current game
 * @returns {string}
 * @see GameManager
 */

class LineGoal extends WinCondition {
  /**
   * A WinCondition that is met after a certain number of lines are cleared
   * @extends WinCondition
   * @param {number} lineGoal The number of lines to be cleared in order to win
   */
  constructor(lineGoal) {
    super(
      function (g) {return g.lineCount >= lineGoal && g.linesToClear.length <= 0;},
      function (g) {return `Line count has reached its goal (${lineGoal} lines)`;}
    );
  }
}