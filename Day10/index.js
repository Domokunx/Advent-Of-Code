// Find sum of signal strength every 40 cycles starting from the 20th
const {readFileSync} = require('fs');

function syncReadFile(filename){
    const contents = readFileSync(filename, 'utf-8');

    const strArr = contents.split(/\r?\n/);

    return strArr;
}
let signal = syncReadFile('./input.txt');

// Create a CRT Grid
let grid = [];
let spriteIndex = [0,1,2];

let specifiedVoltage = 0;
function signalLoop() {
    let cycle = 0;
    let pixelPos = 0;
    let voltage = 1;
    let specifiedCycles = [20,60,100,140,180,220];
    let gridRow = [];
    for (let i = 0; i < signal.length; i++) {
        let command = signal[i].split(' ')[0];

        // Change Sprite Position
        let [a,b,c] = spriteIndex;
        a = voltage-1;
        b = voltage;
        c = voltage+1;
        spriteIndex = [a,b,c]

        
        // Identify command
        if (command.includes('noop')){
            cycle++;

            // Check new Row on CRT
            if (pixelPos === 40){
                pixelPos = 0;
                grid.push(gridRow);
                gridRow = [];
            }

            // Draw Sprite
            if (spriteIndex.includes(pixelPos)){
                gridRow.push('#');
                pixelPos++;
            } 
            
            else {
                gridRow.push('.');
                pixelPos++;
            }

            // Check for specified cycles
            if (specifiedCycles.includes(cycle)){
                specifiedVoltage += cycle * voltage;
            }
        }

        if (command.includes('addx')){
            let voltageChange = parseInt(signal[i].split(' ')[1]);
            for (let index = 0; index < 2; index++) {
                cycle++;

                // Check new Row on CRT
                if (pixelPos === 40){
                    pixelPos = 0;
                    grid.push(gridRow);
                    gridRow = [];
                }

                // Draw Sprite
                if (spriteIndex.includes(pixelPos)){
                    gridRow.push('#');
                    pixelPos++;
                } 
                
                else {
                    gridRow.push('.');
                    pixelPos++;
                }
                
                // Check for specified cycles (start of cycle)
                if (specifiedCycles.includes(cycle)){
                    specifiedVoltage += cycle * voltage;
                }

                // Change the current voltage (end of 2nd cycle)
                if (index === 1){
                    voltage += voltageChange;
                }
            }  
        }
    }
    grid.push(gridRow);
    return specifiedVoltage, grid; 
}
signalLoop();

console.log(specifiedVoltage) // Answer for Part 1

grid.forEach(row => {
    row = row.join('')
    console.log(row)
})