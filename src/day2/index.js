/**
 * Rock - A, X , 1
 * Paper - B, Y, 2
 * Scissors - C, Z, 3
 *
 * Loss - 0
 * Draw - 3
 * Win - 6
 *
 * Best moves:
 * A - Y
 * B - Z
 * C - X
 */

const { partOne } = require('./partOne.js')
const { partTwo } = require('./partTwo.js')

function main() {
  partOne('day2/input.txt')
  partTwo('day2/input.txt')
}

main()
