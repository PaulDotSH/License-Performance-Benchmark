import time
import json

def quick_sort(arr):
    if len(arr) <= 1:
        return

    pivot = arr[-1]
    i = 0
    for j in range(len(arr) - 1):
        if arr[j] <= pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1

    arr[i], arr[-1] = arr[-1], arr[i]

    quick_sort(arr[:i])
    quick_sort(arr[i + 1:])

f = open("../data.json", "r")
array = json.loads(f.read())


start = time.time_ns()
quick_sort(array)
duration = time.time_ns() - start
print(f"Execution time: {duration} ns")