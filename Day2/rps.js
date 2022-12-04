// Calculate strategy guide score
const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
  
    const strArr = contents.split(/\r?\n/);

    return strArr
}

let guide = syncReadFile('./strategyguide.txt')
let totalScore = 0;

function roundScore(roundArr) {
    let opponentHand = roundArr.split(' ')[0]
    let myHand = roundArr.split(' ')[1]
    let score = 0;

    // Score from myHand
    if (myHand === 'X'){
        score += 1;
    }

    else if (myHand === 'Y'){
        score += 2;
    }

    else if (myHand === 'Z'){
        score += 3;
    }

    // Score from result
    // Winning scenarios
    if ((myHand === 'X' && opponentHand === 'C') || (myHand === 'Y' && opponentHand === 'A') || (myHand === 'Z' && opponentHand === 'B')){
        score += 6;
    }

    // Losing scenarios
    else if ((myHand === 'X' && opponentHand === 'B') || (myHand === 'Y' && opponentHand === 'C') || (myHand === 'Z' && opponentHand === 'A')){
        score += 0;
    }

    // Draw scenarios
    else if ((myHand === 'X' && opponentHand === 'A') || (myHand === 'Y' && opponentHand === 'B') || (myHand === 'Z' && opponentHand === 'C')){
        score += 3;
    }

    return score;
}

let counter = 0;
while (counter < guide.length){
    totalScore += roundScore(guide[counter])
    counter++;
}

console.log(totalScore) // Part 1 Answer

// Calculate the real score

function actualRoundScore(roundArr) {
    let opponentHand = roundArr.split(' ')[0]
    let result = roundArr.split(' ')[1]
    let score = 0;

    // Score from result
    if (result === 'X'){
        score += 0;
    }

    else if (result === 'Y'){
        score += 3;
    }

    else if (result === 'Z'){
        score += 6;
    }

    // Deducing myHand
    // Rock 'X'
    if ((opponentHand === 'A' && result === 'Y') || (opponentHand === 'B' && result === 'X') || (opponentHand === 'C' && result === 'Z')){
        score += 1;
    }

    // Paper 'Y'
    if ((opponentHand === 'A' && result === 'Z') || (opponentHand === 'B' && result === 'Y') || (opponentHand === 'C' && result === 'X')){
        score += 2;
    }

    // Scissors 'Z'
    if ((opponentHand === 'A' && result === 'X') || (opponentHand === 'B' && result === 'Z') || (opponentHand === 'C' && result === 'Y')){
        score += 3;
    }
    return score;
}

let totalScore2 = 0;
let counter2 = 0;
while (counter2 < guide.length){
    totalScore2 += actualRoundScore(guide[counter2])
    counter2++;
}

console.log(totalScore2) // Part 1 Answer