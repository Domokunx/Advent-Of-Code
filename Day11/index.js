// Find sum of signal strength every 40 cycles starting from the 20th
const {readFileSync} = require('fs');

function syncReadFile(filename){
    const contents = readFileSync(filename, 'utf-8');

    const strArr = contents.split(/\r?\n/);

    return strArr;
}
let moves = syncReadFile('./input.txt');

// Monkey class
class Monkey {
    constructor(itemsArr, testNumber, testDivider, monkeyFalse, monkeyTrue, inspectType) {
        this.items = itemsArr;
        this.testNumber = testNumber;
        this.inspectType = inspectType;
        this.testDivider = testDivider;
        this.true = monkeyTrue;
        this.false = monkeyFalse;
        this.timesInspected = 0;
    }

    throwMultiply(item) {
        this.timesInspected++;
        let worryLevel = Math.floor((item * this.testNumber) % 9699690);
        if((worryLevel % this.testDivider)  === 0){
            item = worryLevel;
            return [this.true, item];
        }
        else {
            item = worryLevel;
            return [this.false, item];
        }
    }

    throwAddition(item) {
        this.timesInspected++;
        let worryLevel = Math.floor((item + this.testNumber) % 9699690);
        if((worryLevel % this.testDivider)  === 0){
            item = worryLevel;
            return [this.true, item];
        }
        else {
            item = worryLevel;
            return [this.false, item];
        }
    }

    throwMultiplySelf(item){
        this.timesInspected++;
        let worryLevel = Math.floor((item * item) % 9699690);
        if((worryLevel % this.testDivider)  === 0){
            item = worryLevel;
            return [this.true, item];
        }
        else {
            item = worryLevel;
            return [this.false, item];
        }
    }
}

// Get monkey list
let monkeyArr = [
    new Monkey([65, 78], 3, 5, 3, 2, 'multiply'),
    new Monkey([54, 78, 86, 79, 73, 64, 85, 88], 8, 11, 7, 4, 'addition'),
    new Monkey([69, 97, 77, 88, 87], 2, 2, 3, 5, 'addition'),
    new Monkey([99], 4, 13, 5, 1, 'addition'),
    new Monkey([60 ,57, 52], 19, 7, 6, 7, 'multiply'),
    new Monkey([91, 82, 85, 73, 84, 53], 5, 3, 1, 4, 'addition'),
    new Monkey([88, 74, 68, 56], null, 17, 2 ,0, 'self'),
    new Monkey([54, 82, 72, 71, 53, 99, 67], 1, 19, 0, 6, 'addition')
];

// Calculte 20 rounds
function keepAway(){
    for (let round = 0; round < 10000; round++) {
        for (let monkey = 0; monkey < monkeyArr.length ; monkey++) {
            let counter = 0;
            let itemsToThrow = monkeyArr[monkey].items.length;
            let receivingMonkey;
            while(counter < itemsToThrow){ // First mistake was making counter < monkeyArr[monkey].items.length (which decreases every iteration)
                if (monkeyArr[monkey].inspectType === 'addition'){
                    let itemThrown = monkeyArr[monkey].items.pop();
                    [receivingMonkey, itemThrown] = monkeyArr[monkey].throwAddition(itemThrown);
                    monkeyArr[receivingMonkey].items.push(itemThrown);
                }
    
                if (monkeyArr[monkey].inspectType === 'multiply'){
                    let itemThrown = monkeyArr[monkey].items.pop();
                    [receivingMonkey, itemThrown] = monkeyArr[monkey].throwMultiply(itemThrown);
                    monkeyArr[receivingMonkey].items.push(itemThrown);
                }
    
                if (monkeyArr[monkey].inspectType === 'self'){
                    let itemThrown = monkeyArr[monkey].items.pop();
                    [receivingMonkey, itemThrown] = monkeyArr[monkey].throwMultiplySelf(itemThrown);
                    monkeyArr[receivingMonkey].items.push(itemThrown);
                }
                counter++;
            }
        }
    }
    return console.log(monkeyArr);
}
keepAway()
let inspectArr = monkeyArr.map(monkey => monkey = monkey.timesInspected);

// Find top 2 active
let mostActive = Math.max(...inspectArr);
inspectArr[inspectArr.indexOf(mostActive)] = -Infinity;
let secondMostActive = Math.max(...inspectArr);
inspectArr[inspectArr.indexOf(-Infinity)] = mostActive;
console.log(secondMostActive * mostActive) // Answer for Part 1 / Part 2

// Part 2
// Do 10000 Rounds without /3 worry level ++ without affecting the number of inspections

// Change the worryLevel / 3 to worryLevel % 9699690 (product of all testDividers)
// Modulo gives the remainder number, which also happens to be the common denominator and works for checking divisibility with testDivider
// This allows worryLevel to remain within a small range, without affecting 'worryLevel % testDivider === 0'