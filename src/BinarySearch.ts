export default function binarySearch(arr: number[], val: number): number {
  let lo = 0;
  let hi = arr.length;

  while (lo < hi) {
    const mi = Math.floor(lo + (hi - lo) / 2);
    if (arr[mi] === val) {
      return mi;
    }
    if (arr[mi] > val) {
      hi = mi;
    } else {
      lo = mi + 1;
    }
  }
  return -1;
}

export function findLeftMost(arr: number[], val: number): number {
  let lo = 0;
  let hi = arr.length;
  let id = -1;
  while (lo < hi) {
    const mi = Math.floor(lo + (hi - lo) / 2);
    if (arr[mi] === val) {
      id = mi;
    }
    if (arr[mi] >= val) {
      // if val found, keep looking on the left part
      hi = mi;
    } else {
      lo = mi + 1;
    }
  }
  return id;
}

export function findRightMost(arr: number[], val: number): number {
  let lo = 0;
  let hi = arr.length;
  let id = -1;
  while (lo < hi) {
    const mi = Math.floor(lo + (hi - lo) / 2);
    if (arr[mi] === val) {
      id = mi;
    }
    if (arr[mi] > val) {
      hi = mi;
    } else {
      // if val found, keep looking on the right part
      lo = mi + 1;
    }
  }
  return id;
}
