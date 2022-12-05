// Find overlapping duty schedules

const {readFileSync} = require ('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const strArr = contents.split(/\r?\n/);

    return strArr;
}
let list = syncReadFile('./input.txt')
let totallyOverlaps = 0;
let partiallyOverlaps = 0;

// Populate array with designated areas to clean
function scheduleArr(list){
    for (let i = 0; i < list.length; i++) {
        // Find designated area for each elf in pair
        let firstArea = (list[i].split(','))[0];
        let secondArea = (list[i].split(','))[1];

        firstAreaStart = parseInt(firstArea.split('-'));
        firstAreaEnd = parseInt(firstArea.slice(firstArea.indexOf('-') + 1));

        secondAreaStart = parseInt(secondArea.split('-'));
        secondAreaEnd = parseInt(secondArea.slice(secondArea.indexOf('-') + 1));

        // Compare Range limit of duty area (part 1)
        if (((firstAreaEnd <= secondAreaEnd) && (firstAreaStart >= secondAreaStart)) || ((firstAreaEnd >= secondAreaEnd) && (firstAreaStart <= secondAreaStart))) totallyOverlaps++;
        
        // Find partial overlaps (i.e as long as it contains 1 shared area) (part 2)
        if (((firstAreaEnd >= secondAreaStart) && (firstAreaStart <= secondAreaStart)) || ((secondAreaEnd >= firstAreaStart) && (secondAreaStart <= firstAreaStart))) partiallyOverlaps++;
    }
    return totallyOverlaps, partiallyOverlaps;
} 
scheduleArr(list)

console.log(totallyOverlaps) // Answer for part 1
console.log(partiallyOverlaps) // Answer for part 2
