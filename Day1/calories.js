// From list get the elf with the highest calories in snacks
const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
  
    const strArr = contents.split(/\r?\n/);

    const intArr = strArr.map(Number)

    return intArr;
}
let list = syncReadFile('./calories.txt')

let elfArr = []
let currentElf = 0;

for (i = 0; i < list.length; i++){
    if (list[i] === 0){
        elfArr.push(currentElf);
        currentElf = 0;
    }

    else {
        currentElf += list[i]
    }
}

let firstElf = Math.max(...elfArr);
elfArr[elfArr.indexOf(firstElf)] = -Infinity; //Temporarily replace top to find 2nd

let secondElf = Math.max(...elfArr);
elfArr[elfArr.indexOf(secondElf)] = -Infinity;

let thirdElf = Math.max(...elfArr);
elfArr[elfArr.indexOf(firstElf)] = firstElf;
elfArr[elfArr.indexOf(secondElf)] = secondElf;

let topThreeElves = [firstElf, secondElf, thirdElf].reduce((a,b) => a+b)
console.log(firstElf)
console.log(topThreeElves)