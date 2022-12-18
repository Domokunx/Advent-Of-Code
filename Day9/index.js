// Find number of positions the tail has visited
const {readFileSync} = require('fs');

function syncReadFile(filename){
    const contents = readFileSync(filename, 'utf-8');

    const strArr = contents.split(/\r?\n/);

    return strArr;
}
let moves = syncReadFile('./input.txt');


let visitedArr = [];
let currentheadPosition = [0,0];
let newHeadPosition = currentheadPosition;
let tailPosition = [0,0];

function snakeThing(currentheadPosition,tailPosition) {
    for (let i = 0; i < moves.length; i++) {
        let direction = moves[i].split(' ')[0];
        let timesMoved = parseInt(moves[i].split(' ')[1]);

        let counter = 0;
        while (counter < timesMoved){
            // Move Head 
            let [x,y] = newHeadPosition
            
            // Move Up
            if (direction === 'U'){
                y++;
            }
            
            // Move Down
            if (direction === 'D'){
                y--;
            }

            // Move Left
            if (direction === 'L'){
                x--;
            }

            // Move Right
            if (direction === 'R'){
                x++;
            }

            newHeadPosition = [x,y]

            // Move Tail (if need)
            let [a,b] = tailPosition;
            if (Math.abs(a - x) > 1 || Math.abs(b - y) > 1){
                tailPosition = currentheadPosition;
            }

            // Save Position of TAIL if unique
            let dupeCheck = new Set(visitedArr);
            if (!dupeCheck.has(tailPosition.toString())){
                visitedArr.push(tailPosition.toString());
            }

            // Update Head Position
            currentheadPosition = newHeadPosition;
            counter++;
        }
    }
    return console.log(visitedArr.length); // Answer for Part 1 (5710)
}
snakeThing(currentheadPosition,tailPosition);



// Part 2
let visitedArr2 = [];
let snakeArr = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]];

function snakeThing2() {
    for (let i = 0; i < moves.length; i++) {
        let direction = moves[i].split(' ')[0];
        let timesMoved = parseInt(moves[i].split(' ')[1]);

        let counter = 0;
        while (counter < timesMoved){
            // Move Head 
            let newSnakeHeadPos = snakeArr[0]
            let [x,y] = snakeArr[0];
            
            // Move Up
            if (direction === 'U'){
                y++;
            }
            
            // Move Down
            if (direction === 'D'){
                y--;
            }

            // Move Left
            if (direction === 'L'){
                x--;
            }

            // Move Right
            if (direction === 'R'){
                x++;
            }

            newSnakeHeadPos = [x,y];
            
            // Move Tail (if need)
            for (let j = 0, k = j + 1; j < snakeArr.length - 1; j++, k++){

                if (j === 0){
                    let [x,y] = newSnakeHeadPos;
                    let [a,b] = snakeArr[k];
                    if (Math.abs(a - x) > 1 || Math.abs(b - y) > 1){
                        snakeArr[k] = snakeArr[j];
                    }
                    snakeArr[j] = newSnakeHeadPos;
                }

                else {
                    let [newX, newY] = snakeArr[j];
                    let [tailX, tailY] = snakeArr[k];

                    // Diagonal Right Up
                    if (((newX - tailX >= 1) && (newY - tailY >= 1)) && !((newX - tailX === 1) && (newY - tailY === 1))){
                        snakeArr[k] = [tailX + 1, tailY + 1]
                    }

                    // Diagonal Left Up
                    else if (((newX - tailX <= -1) && (newY - tailY >= 1)) && !((newX - tailX === -1) && (newY - tailY === 1))){
                        snakeArr[k] = [tailX - 1, tailY + 1]
                    }

                    // Diagonal Left Down
                    else if (((newX - tailX <= -1) && (newY - tailY <= -1)) && !((newX - tailX === -1) && (newY - tailY === -1))){
                        snakeArr[k] = [tailX - 1, tailY - 1]
                    }

                    // Diagonal Right Down
                    else if (((newX - tailX >= 1) && (newY - tailY <= -1)) && !((newX - tailX === 1) && (newY - tailY === -1))){
                        snakeArr[k] = [tailX + 1, tailY - 1]
                    }

                    // Up Only
                    else if (newY - tailY === 2){
                        snakeArr[k] = [tailX, tailY + 1]
                    }

                    // Down Only
                    else if (newY - tailY === -2){
                        snakeArr[k] = [tailX, tailY - 1]
                    }

                    // Left Only
                    else if (newX - tailX === -2){
                        snakeArr[k] = [tailX - 1, tailY]
                    }

                    // Right Only
                    else if (newX - tailX === 2){
                        snakeArr[k] = [tailX + 1, tailY]
                    }
                }
            }

            // Save Position of TAIL if unique
            let dupeCheck = new Set(visitedArr2);
            if (!dupeCheck.has(snakeArr[9].toString())){
                visitedArr2.push(snakeArr[9].toString());
            }
            counter++;
        }   
    }   
    return console.log(visitedArr2.length); // Answer for Part 2 <2259
}
snakeThing2()