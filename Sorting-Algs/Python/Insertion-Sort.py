import time
import json

def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key



f = open("../data.json", "r")
array = json.loads(f.read())


start = time.time_ns()
insertion_sort(array)
duration = time.time_ns() - start
print(f"Execution time: {duration} ns")