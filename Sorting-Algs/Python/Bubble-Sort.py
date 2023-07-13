import time
import json

def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

f = open("../data.json", "r")
array = json.loads(f.read())


start = time.time_ns()
bubble_sort(array)
duration = time.time_ns() - start
print(f"Execution time: {duration} ns")