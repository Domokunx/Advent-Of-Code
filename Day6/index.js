// Find and return the index+1 of the first occurring 4 unique char combination
const {readFileSync} = require ('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const strArr = contents.split(/\r?\n/);

    return strArr;
}
let signal = syncReadFile('./input.txt')
let signalArr = signal[0].split('')

// part 1
let packetMarker = signalArr.slice(0,4);

for (let i = 4; i < signalArr.length; i++) {
    let checkerArr = [...new Set(packetMarker)]; // Set removes duplicate characters, ensuring unique arrays
    if (checkerArr.length === 4){
        (console.log(checkerArr, i)); // Answer for Part 1
        break;
    }

    packetMarker.shift();
    packetMarker.push(signalArr[i]);
}

// part 2
let messageMarker = signalArr.slice(0,14)

for (let i = 14; i < signalArr.length; i++) {
    let checkerArr = [...new Set(messageMarker)]; // Set removes duplicate characters, ensuring unique arrays
    if (checkerArr.length === 14){
        (console.log(checkerArr, i)); // Answer for Part 2
        break;
    }

    messageMarker.shift();
    messageMarker.push(signalArr[i]);
}