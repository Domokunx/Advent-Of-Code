// Find the number for VISIBLE trees
const {readFileSync} = require ('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const strArr = contents.split(/\r?\n/);

    return strArr;
}

let treeGrid = syncReadFile('./input.txt')

let treeGridNumber = [];
treeGrid.forEach(row => {
    treeGridNumber.push(row.split(''));
});

treeGridNumber.forEach(row => {
    for (let index = 0; index < row.length; index++) {
        row[index] = parseInt(row[index]);
    }
})

let visibleTrees = 0;

// Loop through each tree
function checkVisiblity() {
    for (let i = 0; i < treeGridNumber.length; i++) {
        for (let j = 0; j < treeGridNumber[0].length; j++) {

            // If on outer grid, tree is visible
            if (i === 0 || i === treeGridNumber.length || j === 0 || j === treeGridNumber[0].length-1){
                visibleTrees++;
                continue;
            }

            // Check trees on left
            let treesToLeft = j;
            function checkLeft(treesToLeft) {
                while (treesToLeft != 0){
                    if (treeGridNumber[i][treesToLeft-1] >= treeGridNumber[i][j]){
                        return false;
                    }
                    treesToLeft--;
                }
                return true;
            }
            
            // Check trees on right
            let treesToRight = (treeGridNumber[0].length - 1);
            function checkRight(treesToRight) {
                while (treesToRight != j){
                    if (treeGridNumber[i][treesToRight] >= treeGridNumber[i][j]){
                        return false;
                    }
                    treesToRight--;
                }
                return true;
            }

            // Check trees on top
            let treesAbove = i;
            function checkAbove(treesAbove){
                while (treesAbove != 0){
                    if (treeGridNumber[treesAbove-1][j] >= treeGridNumber[i][j]){
                        return false;
                    }
                    treesAbove--;
                }
                return true;
            }

            // Check trees below
            let treesBelow = (treeGridNumber.length - 1);
            function checkBelow(treesBelow) {
                while (treesBelow != i){
                    if (treeGridNumber[treesBelow][j] >= treeGridNumber[i][j]){
                        return false;
                    }
                    treesBelow--;
                }
                return true;
            }

            if (checkAbove(treesAbove) || checkBelow(treesBelow) || checkLeft(treesToLeft) || checkRight(treesToRight)){
                visibleTrees++;
            }
        }
    }
}

checkVisiblity()
console.log(visibleTrees) // Answer for Part 1



// Find the best scenic score
let scenicScoreArr = [];
let scenicScore;

// Loop through each tree
function checkScore() {
    for (let i = 0; i < treeGridNumber.length; i++) {
        for (let j = 0; j < treeGridNumber[0].length; j++) {

            // Check trees on left
            let leftScore = 0;
            let treesToLeft = j;
            function checkLeft(treesToLeft) {
                while (treesToLeft != 0){
                    if (treeGridNumber[i][treesToLeft-1] >= treeGridNumber[i][j]){
                        leftScore++;
                        return leftScore;
                    }
                    treesToLeft--;
                    leftScore++;
                }
                return leftScore;
            }
            
            // Check trees on right
            let rightScore = 0;
            let nextIndex = j + 1;
            let treesToRight = (treeGridNumber[0].length - 1) - j;
            function checkRight(treesToRight) {
                while (treesToRight != 0){
                    if (treeGridNumber[i][nextIndex] >= treeGridNumber[i][j]){
                        rightScore++;
                        return rightScore;
                    }
                    rightScore++;
                    nextIndex++;
                    treesToRight--;
                }
                return rightScore;
            }

            // Check trees on top
            let topScore = 0;
            let treesAbove = i;
            function checkAbove(treesAbove){
                while (treesAbove != 0){
                    if (treeGridNumber[treesAbove-1][j] >= treeGridNumber[i][j]){
                        topScore++;
                        return topScore;
                    }
                    topScore++;
                    treesAbove--;
                }
                return topScore;
            }

            // Check trees below
            let bottomScore = 0;
            let bottomIndex = i + 1;
            let treesBelow = (treeGridNumber.length - 1) - i;
            function checkBelow(treesBelow) {
                while (treesBelow != 0){
                    if (treeGridNumber[bottomIndex][j] >= treeGridNumber[i][j]){
                        bottomScore++;
                        return bottomScore;
                    }
                    bottomIndex++;
                    bottomScore++;
                    treesBelow--;
                }
                return bottomScore;
            }

            // Calculate score
            scenicScore = checkAbove(treesAbove) * checkBelow(treesBelow) * checkLeft(treesToLeft) * checkRight(treesToRight);
            scenicScoreArr.push(scenicScore);
        }
    }
    return scenicScoreArr;
}
checkScore();

console.log(Math.max(...scenicScoreArr)) // Answer for Part 2