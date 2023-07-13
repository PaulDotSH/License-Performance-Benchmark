const fs = require('fs');

let array = fs.readFileSync('../data.json', 'utf8');

array = JSON.parse(array)


function bubbleSort(arr) {
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

const start = process.hrtime.bigint();
bubbleSort(array);
const end = process.hrtime.bigint();
const duration = end - start;
console.log(`Execution time: ${duration} ns`);