function qs(arr: number[], lo: number, hi: number) {
  if (hi - lo <= 0) {
    return;
  }
  const pivot = partition(arr, lo, hi);
  qs(arr, lo, pivot - 1);
  qs(arr, pivot + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = hi;
  let firstHigh = lo;

  for (let i = lo; i < hi; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, firstHigh);
      firstHigh++;
    }
  }

  swap(arr, firstHigh, pivot);
  return firstHigh;
}

function swap(arr: number[], i: number, j: number) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

export default function quickSort(arr: number[]) {
  qs(arr, 0, arr.length - 1);
}
