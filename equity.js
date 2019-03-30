const {calculateEquity} = require('poker-odds');

const hands = [['As', 'Kh'], ['Kd', 'Qs']]
const board = ['Td', '7s', '8d']
const iterations = 10 // optional
const exhaustive = true // optional

const result = calculateEquity(hands, board, iterations, exhaustive)
console.log(result)
