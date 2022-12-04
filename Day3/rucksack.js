const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
  
    const strArr = contents.split(/\r?\n/);

    return strArr
}
let rucksack = syncReadFile('./input.txt');
let totalPriorities = 0;

// Prioritise items a-z (1 -26) A-Z (27-52)
let priorityValues = new Map()
priorityValues.set('a', 1);
priorityValues.set('b', 2);
priorityValues.set('c', 3);
priorityValues.set('d', 4);
priorityValues.set('e', 5);
priorityValues.set('f', 6);
priorityValues.set('g', 7);
priorityValues.set('h', 8);
priorityValues.set('i', 9);
priorityValues.set('j', 10);
priorityValues.set('k', 11);
priorityValues.set('l', 12);
priorityValues.set('m', 13);
priorityValues.set('n', 14);
priorityValues.set('o', 15);
priorityValues.set('p', 16);
priorityValues.set('q', 17);
priorityValues.set('r', 18);
priorityValues.set('s', 19);
priorityValues.set('t', 20);
priorityValues.set('u', 21);
priorityValues.set('v', 22);
priorityValues.set('w', 23);
priorityValues.set('x', 24);
priorityValues.set('y', 25);
priorityValues.set('z', 26);
priorityValues.set('A', 27);
priorityValues.set('B', 28);
priorityValues.set('C', 29);
priorityValues.set('D', 30);
priorityValues.set('E', 31);
priorityValues.set('F', 32);
priorityValues.set('G', 33);
priorityValues.set('H', 34);
priorityValues.set('I', 35);
priorityValues.set('J', 36);
priorityValues.set('K', 37);
priorityValues.set('L', 38);
priorityValues.set('M', 39);
priorityValues.set('N', 40);
priorityValues.set('O', 41);
priorityValues.set('P', 42);
priorityValues.set('Q', 43);
priorityValues.set('R', 44);
priorityValues.set('S', 45);
priorityValues.set('T', 46);
priorityValues.set('U', 47);
priorityValues.set('V', 48);
priorityValues.set('W', 49);
priorityValues.set('X', 50);
priorityValues.set('Y', 51);
priorityValues.set('Z', 52);

// Split rucksack into 2
function splitRucksack(rucksack){
    let rucksack1 = rucksack.slice(0,Math.ceil(rucksack.length/2))
    let rucksack2 = rucksack.slice(Math.ceil(rucksack.length/2));
    
    // Find common item 
    let commonItem = undefined;
    for (let i = 0; i < rucksack1.length; i++){
        for (let j = 0; j < rucksack1.length; j++){
            if (rucksack2[j] === rucksack1[i]){
                commonItem = rucksack2[j];
                // Sum of priority value of common item
                totalPriorities += prioritiseItems(commonItem);
                return totalPriorities
            }

        }
    }
}

// Get the priority value for the common item
function prioritiseItems(item){
    return (priorityValues.get(item))
}

let counter = 0;
while (counter < rucksack.length){
    splitRucksack(rucksack[counter]);
    counter++
}

console.log(totalPriorities) // Answer for Part 1

// Split into groups of 3
let groupArr = []
function splitGroupsOfThree(list){
    for (let i = 0; i < list.length; i += 3){
        groupArr.push(list.slice(i, i+3))
    }
}
splitGroupsOfThree(rucksack);

//Find badge in group
let totalBadgePriority = 0;

groupArr.forEach(group => {
    let [rucksack1, rucksack2, rucksack3] = [...group]
    let commonItem = undefined;

    //Compare first 2 rucksacks for a common item
    for (let i = 0; i < rucksack1.length; i++) {
        for (let j = 0; j < rucksack2.length; j++) {
            if (rucksack2[j] === rucksack1[i]){
                commonItem = rucksack1[i]
                
                //Check if it is all common in the 3rd rucksack
                for (let k = 0; k < rucksack3.length; k++) {
                    if (commonItem === rucksack3[k]) {
                        return totalBadgePriority += priorityValues.get(commonItem);
                    }
                }
            }
        }
    }
});

console.log(totalBadgePriority) // Answer for Part 2