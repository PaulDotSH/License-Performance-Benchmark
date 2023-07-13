const fs = require('fs');

let array = fs.readFileSync('../data.json', 'utf8');

array = JSON.parse(array)


function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }

        arr[j + 1] = key;
    }
}

const start = process.hrtime.bigint();
insertionSort(array);
const end = process.hrtime.bigint();
const duration = end - start;
console.log(`Execution time: ${duration} ns`);