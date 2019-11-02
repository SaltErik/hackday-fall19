`use strict`;
var count = 0;

console.log(`${count += 1}) Starting...`);

function asyncFunc() {
    console.log(`${count += 1}) Entered asyncFunc...`);
    const blank = [];
    setTimeout(() => {
        console.log(`${count += 1}) Entered asyncFunc timeout...`);
        return blank.push('DONE')}
    , 3000);
    return blank;
}

const blank = asyncFunc();
// Wait until the value has been filled in

setTimeout(() => {
    console.log(`${count += 1}) Entered main timeout...`);
    const x = blank[0]; // (A)
    console.log(`${count += 1}) Result: ${x}`);
}, 6000);

console.log(`${count += 1}) END OF FILE`);
