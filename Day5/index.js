// Find the topmost crates from left to right
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

// Arrange crate positions into individual array (bottom-top right-left)
console.log(cratePositionsArr);
let finalPositions = [];
for (let i = 1; i <= 9; i++) {
    finalPositions.push(cratePositionsArr[i][0].split(''))
}

function moveCrates() {
    for (let i = 0; i < moves.length; i++) {
        // Convert move.txt into code
        // Filter the numbers only (cratesToMove, columnFrom, columnTo)
        let numbersArr = moves[i].split('') // Convert string to array
        let numbers = numbersArr.filter(elem => !isNaN(elem) && elem !== ' ') // Remove alphabets and spaces from array
    
        // Fill in the variables
        let cratesToMove = numbers.length === 3 ? parseInt(numbers[0]) : (parseInt("" + numbers[0] + numbers[1]));
        let columnFrom = numbers.length === 3 ? parseInt(numbers[1]) : parseInt(numbers[2]);
        let columnTo  = numbers.length === 3 ? parseInt(numbers[2]) : parseInt(numbers[3]);
        
        let counter = 0;
        while (counter < cratesToMove){
            let crate = finalPositions[columnFrom-1].shift();
            finalPositions[columnTo-1].unshift(crate);
            counter++
        }
    }
    return finalPositions;
}
moveCrates();

let finalPositionsArr = [];
for (let i = 0; i < finalPositions.length; i++) {
    finalPositionsArr[i] = finalPositions[i][0];
}
console.log(finalPositions)
console.log(finalPositionsArr.join('')); // Answer for Part 1

// Cratemover 9001 can move multiple crates at the same time, order changes

let finalPositions2 = [];
for (let i = 1; i <= 9; i++) {
    finalPositions2.push(cratePositionsArr[i][0].split(''))
}

function moveCrates2() {
    for (let i = 0; i < moves.length; i++) {
        // Convert move.txt into code
        // Filter the numbers only (cratesToMove, columnFrom, columnTo)
        let numbersArr = moves[i].split('') // Convert string to array
        let numbers = numbersArr.filter(elem => !isNaN(elem) && elem !== ' ') // Remove alphabets and spaces from array
    
        // Fill in the variables
        let cratesToMove = numbers.length === 3 ? parseInt(numbers[0]) : (parseInt("" + numbers[0] + numbers[1]));
        let columnFrom = numbers.length === 3 ? parseInt(numbers[1]) : parseInt(numbers[2]);
        let columnTo  = numbers.length === 3 ? parseInt(numbers[2]) : parseInt(numbers[3]);
        
        // Move the crates simultaneously (Part 2)
        let crate = finalPositions2[columnFrom-1].slice(0,cratesToMove); // Remove crate from columnFrom
        finalPositions2[columnFrom-1] = finalPositions2[columnFrom-1].slice(cratesToMove); // Update columnFrom
        finalPositions2[columnTo-1] = [...crate,...finalPositions2[columnTo-1]] // Update columnTo
    }
    return finalPositions2;
}
moveCrates2();

let finalPositionsArr2 = [];
for (let i = 0; i < finalPositions2.length; i++) {
    finalPositionsArr2[i] = finalPositions2[i][0];
}
console.log(finalPositions2)
console.log(finalPositionsArr2.join('')); // Answer for Part 2
