// Find files with size <= 100000
const {readFileSync} = require ('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const strArr = contents.split(/\r?\n/);

    return strArr;
}

let commands = syncReadFile('./input.txt')

// Dir class
class Directory {
    constructor(size, name, prevDir) {
        this.size = size;
        this.name = name;
        this.dirInside = [];
        this.prevDir = prevDir;
    }
}

let currentDir = new Directory(0, undefined);
let dirArr = [];

// $ cd command opens a folder, save that folder and calculate its size 
function identifyDir(commandLine){

    // Identify the dir opened
    //  '$ cd ..' means to go back to prevDir
    if (commandLine.includes('..')){

        //Add the final size of current Dir to prev Dir
        currentDir.prevDir.size += currentDir.size;
        currentDir = currentDir.prevDir;
    }

    // '$ cd <dirName> means to open that folder
    else{
        currentDir = new Directory(0, commandLine.split(' ')[2], currentDir);
        dirArr.push(currentDir);
    }
}

commands.forEach(command => {
    
    // Identify current command
    if (command.includes('$ cd')){

        // Identify Dir
        identifyDir(command);
    }

    else if (command.includes('$ ls')){
        return;
    }

    else if (command.includes('dir')){
        currentDir.dirInside.push(command.split(' ')[1]);
    }

    else if (Number.isInteger(parseInt(command.split(' ')[0]))){
        currentDir.size += parseInt(command.split(' ')[0]);
    }
})

// Filter out the at most 100000
let dirLessThan100000 = dirArr.filter(dir => dir.size <= 100000);
let totalSize = 0
dirLessThan100000.forEach(dir => {
    totalSize += dir.size;
})
console.log(totalSize) // Answer for Part 1


// Find a file that when deleted frees enough space for 1609574 (30,000,000 -(70,000,000 - /.size))
let deletableDirs = dirArr.filter(dir => dir.size >= 1609574)

// From deletable Dirs, find the smallest dir
let smallestDirSize = Infinity;
deletableDirs.forEach(dir => {
    if (dir.size < smallestDirSize) return smallestDirSize = dir.size;
})

console.log(smallestDirSize); // Answer for Part 2