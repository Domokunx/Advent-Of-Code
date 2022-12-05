// Find the topmost crates from left to right
const { Console } = require('console');
const {readFileSync} = require ('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const strArr = contents.split(/\r?\n/);

    return strArr;
}
let moves = syncReadFile('./moves.txt');
let cratePositionsArr = {
    1: ['WPGZVSB'],
    2: ['FZCBVJ'],
    3: ['CDZNHMLV'],
    4: ['BJFPZMDL'],
    5: ['HQBJGCFV'],
    6: ['BLSTQFG'],
    7: ['VZCGL'],
    8: ['GLN'],
    9: ['CHFJ'],
}

// Arrange crate positions into individual array (bottom-top left-right)
console.log(cratePositionsArr);
let finalPositions = [];
for (let i = 1; i <= 9; i++) {
    finalPositions.push(cratePositionsArr[i][0].split(''))
}

// Convert move.txt into code
function convertMoves() {
    for (let i = 0; i < moves.length; i++) {
        // Filter the numbers only (cratesToMove, columnFrom, columnTo)
        let numbersArr = moves[i].split('') // Convert string to array
        let numbers = numbersArr.filter(elem => !isNaN(elem) && elem !== ' ') // Remove alphabets and spaces from array
    
        // Fill in the variables
        let cratesToMove = numbers.length === 3 ? parseInt(numbers[0]) : (parseInt("" + numbers[0] + numbers[1]));
        let columnFrom = numbers.length === 3 ? parseInt(numbers[1]) : parseInt(numbers[2]);
        let columnTo  = numbers.length === 3 ? parseInt(numbers[2]) : parseInt(numbers[3]);
        
        let counter = 0;
        while (counter < cratesToMove){
            let crate = finalPositions[columnFrom-1].pop();
            finalPositions[columnTo-1].push(crate);
            counter++
        }
    }
    return finalPositions;
}
convertMoves();

let finalPositionsArr = [];
for (let i = 0; i < finalPositions.length; i++) {
    finalPositionsArr.push(finalPositions[i][finalPositions[i].length - 1])
}

console.log(finalPositionsArr.join('')); // Answer for Part 1
