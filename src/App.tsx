import React, { useEffect, useState } from "react";

function App() {
  const [arr, setArr] = useState<number[]>([]);
  const [length, setLength] = useState<number>(100);
  const [maxValue, setMaxValue] = useState<number>(150);
  const [time, setTime] = useState<number>(0);

  const bubbleSort = () => {
    let i = 0;
    let j = 0;

    const sortingInterval = setInterval(() => {
      if (i < arr.length) {
        if (j < arr.length - i - 1) {
          if (arr[j] > arr[j + 1]) {
            // Swap elements
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            // Update state after each swap
            setArr([...arr]);
          }
          j++;
        } else {
          i++;
          j = 0;
        }
      } else {
        clearInterval(sortingInterval); // Stop the sorting interval
      }
    }, time); // Adjust the delay as needed
  };

  const selectionSort = () => {
    let i = 0;
    let j = 0;

    const sortingInterval = setInterval(() => {
      if (i < arr.length - 1) {
        let minIndex = i;
        for (let k = i + 1; k < arr.length; k++) {
          if (arr[k] < arr[minIndex]) {
            minIndex = k;
          }
        }
        // Swap elements
        let temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;

        // Update state after each swap
        setArr([...arr]);
        i++;
      } else {
        clearInterval(sortingInterval); // Stop the sorting interval
      }
    }, time); // Adjust the delay as needed
  };

  const insertionSort = () => {
    let newArr = [...arr];
    let i = 1;

    const sortingInterval = setInterval(() => {
      if (i < newArr.length) {
        let current = newArr[i];
        let j = i - 1;

        while (j >= 0 && newArr[j] > current) {
          newArr[j + 1] = newArr[j];
          j--;
        }

        newArr[j + 1] = current;
        setArr([...newArr]);
        i++;
      } else {
        clearInterval(sortingInterval);
      }
    }, time); // Adjust the delay as needed
  };

  const mergeSort = () => {
    const merge = (
      arr: number[],
      left: number,
      middle: number,
      right: number
    ) => {
      const n1 = middle - left + 1;
      const n2 = right - middle;

      const leftArray = new Array(n1);
      const rightArray = new Array(n2);

      for (let i = 0; i < n1; i++) {
        leftArray[i] = arr[left + i];
      }

      for (let j = 0; j < n2; j++) {
        rightArray[j] = arr[middle + 1 + j];
      }

      let i = 0;
      let j = 0;
      let k = left;

      while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
          arr[k] = leftArray[i];
          i++;
        } else {
          arr[k] = rightArray[j];
          j++;
        }
        k++;
      }

      while (i < n1) {
        arr[k] = leftArray[i];
        i++;
        k++;
      }

      while (j < n2) {
        arr[k] = rightArray[j];
        j++;
        k++;
      }
    };

    let newArr = [...arr];
    let currentSize = 1;

    const sortingInterval = setInterval(() => {
      if (currentSize < newArr.length) {
        for (let left = 0; left < newArr.length - 1; left += 2 * currentSize) {
          const middle = Math.min(left + currentSize - 1, newArr.length - 1);
          const right = Math.min(left + 2 * currentSize - 1, newArr.length - 1);

          merge(newArr, left, middle, right);
        }

        setArr([...newArr]);
        currentSize *= 2;
      } else {
        clearInterval(sortingInterval);
      }
    }, time); // Adjust the delay as needed
  };

  const quickSort = () => {
    const partition = (arr: number[], low: number, high: number): number => {
      let pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
          i++;

          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }

      let temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;

      return i + 1;
    };

    let newArr = [...arr];
    let stack: [number, number][] = [];

    stack.push([0, newArr.length - 1]);

    const sortingInterval = setInterval(() => {
      if (stack.length > 0) {
        let [low, high] = stack.pop() as [number, number];

        let pivotIndex = partition(newArr, low, high);

        if (pivotIndex - 1 > low) {
          stack.push([low, pivotIndex - 1]);
        }

        if (pivotIndex + 1 < high) {
          stack.push([pivotIndex + 1, high]);
        }

        setArr([...newArr]);
      } else {
        clearInterval(sortingInterval);
      }
    }, time); // Adjust the delay as needed
  };

  const heapSort = () => {
    const heapify = (arr: number[], n: number, i: number) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }

      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }

      if (largest !== i) {
        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        heapify(arr, n, largest);
      }
    };

    const buildMaxHeap = (arr: number[]) => {
      const n = arr.length;

      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
      }
    };

    const newArr = [...arr];
    let n = newArr.length;

    buildMaxHeap(newArr);

    const sortingInterval = setInterval(() => {
      if (n > 1) {
        const temp = newArr[0];
        newArr[0] = newArr[n - 1];
        newArr[n - 1] = temp;

        setArr([...newArr]);

        n--;

        heapify(newArr, n, 0);
      } else {
        clearInterval(sortingInterval);
      }
    }, time); // Adjust the delay as needed
  };

  const bucketSort = () => {
    const getMax = (arr: number[]): number => {
      let max = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
      return max;
    };

    const distributeToBuckets = (
      arr: number[],
      max: number,
      numBuckets: number
    ): number[][] => {
      const buckets: number[][] = Array.from({ length: numBuckets }, () => []);

      for (let i = 0; i < arr.length; i++) {
        const bucketIndex = Math.floor((arr[i] / max) * (numBuckets - 1));
        buckets[bucketIndex].push(arr[i]);
      }

      return buckets;
    };

    const sortBuckets = (buckets: number[][]): number[] => {
      const sortedArray: number[] = [];
      for (let i = 0; i < buckets.length; i++) {
        buckets[i].sort((a, b) => a - b);
        sortedArray.push(...buckets[i]);
      }
      return sortedArray;
    };

    let newArr = [...arr];
    const max = getMax(newArr);
    const numBuckets = Math.ceil(Math.sqrt(newArr.length));

    const buckets = distributeToBuckets(newArr, max, numBuckets);
    let bucketIndex = 0;
    let elementIndex = 0;

    const sortingInterval = setInterval(() => {
      if (bucketIndex < buckets.length) {
        if (elementIndex < buckets[bucketIndex].length) {
          newArr[elementIndex] = buckets[bucketIndex][elementIndex];
          setArr([...newArr]);
          elementIndex++;
        } else {
          elementIndex = 0;
          bucketIndex++;
        }
      } else {
        clearInterval(sortingInterval);
      }
    }, time); // Adjust the delay as needed
  };

  const countingSort = () => {
    const maxElement = Math.max(...arr);
    const countingArray = new Array(maxElement + 1).fill(0);
    let resultIndex = 0;

    const sortingInterval = setInterval(() => {
      if (resultIndex < arr.length) {
        const currentElement = arr[resultIndex];
        countingArray[currentElement]++;
        resultIndex++;
        setArr([...countingArray]); // Update the state after each step
      } else {
        // Reconstruct the sorted array
        let sortedIndex = 0;
        for (let i = 0; i < countingArray.length; i++) {
          while (countingArray[i] > 0) {
            arr[sortedIndex] = i;
            countingArray[i]--;
            sortedIndex++;
            setArr([...arr]); // Update the state after each step
          }
        }

        clearInterval(sortingInterval); // Stop the sorting interval
      }
    }, time); // Adjust the delay as needed
  };
  const randomize = () => {
    const randomArr = Array.from({ length }, () =>
      Math.floor(Math.random() * maxValue)
    );
    setArr(randomArr);
  };

  return (
    <main className="flex flex-col justify-end p-10 items-center w-full h-screen ">
      <h1 className="text-3xl font-bold absolute top-10">Sorting Algorithms</h1>
      <div className="flex flex-col gap-2">
        <div className="flex items-end gap-1 h-[800px]">
          {arr.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="font-semibold">{item}</p>
              <div
                className={`w-4 bg-green-500 flex justify-center text-white `}
                style={{ height: `${item * 5}px` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-10 mt-10">
        {/*input for length and max value and time */}

        <input
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="px-4 py-2 border-2 border-green-500 rounded-md"
        />
        <input
          type="number"
          value={maxValue}
          onChange={(e) => setMaxValue(parseInt(e.target.value))}
          className="px-4 py-2 border-2 border-green-500 rounded-md"
        />
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(parseInt(e.target.value))}
          className="px-4 py-2 border-2 border-green-500 rounded-md"
        />
      </div>
      <div className="flex gap-9 mt-10">
        <button
          onClick={bubbleSort}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Bubble Sort
        </button>
        <button
          onClick={selectionSort}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Selection Sort
        </button>
        <button
          onClick={insertionSort}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Insertion Sort
        </button>
        <button
          onClick={mergeSort}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Merge Sort
        </button>
        <button
          onClick={quickSort}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Quick Sort
        </button>
        <button
          onClick={heapSort}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Heap Sort
        </button>
        <button
          onClick={bucketSort}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Bucket Sort
        </button>
        <button
          onClick={countingSort}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Counting Sort
        </button>
        <button
          onClick={randomize}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Randomize
        </button>
      </div>
    </main>
  );
}

export default App;
