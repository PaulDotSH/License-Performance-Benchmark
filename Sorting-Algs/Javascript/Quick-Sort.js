const fs = require('fs');

let array = fs.readFileSync('../data.json', 'utf8');

array = JSON.parse(array)


function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] <= pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

const start = process.hrtime.bigint();
quickSort(array);
const end = process.hrtime.bigint();
const duration = end - start;
console.log(`Execution time: ${duration} ns`);