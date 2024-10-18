export default class MinHeap {
  data: number[];

  constructor() {
    this.data = [];
  }

  insert(value: number): void {
    this.data.push(value);
    this.#heapifyUp(this.data.length - 1);
  }

  pop(): number | undefined {
    if (!this.data.length) {
      return undefined;
    }
    if (this.data.length == 1) {
      // if the tree has only one node then just take it out
      return this.data.shift();
    }
    const v = this.data[0];
    this.data[0] = this.data.pop()!;
    this.#heapifyDown(0);
    return v;
  }

  #heapifyDown(idx: number): void {
    const l = this.#leftChild(idx);
    const r = this.#rightChild(idx);

    let minId = idx; // index that has minimum value among parent and two child
    if (l < this.data.length && this.data[l] < this.data[minId]) {
      minId = l;
    }
    if (r < this.data.length && this.data[r] < this.data[minId]) {
      minId = r;
    }
    if (minId != idx) {
      this.#swap(minId, idx);
      this.#heapifyDown(minId);
    }
  }

  #heapifyUp(idx: number): void {
    if (idx == 0) {
      // if it's the root node
      return;
    }
    const p = this.#parent(idx);
    if (this.data[idx] < this.data[p]) {
      this.#swap(idx, p);
      this.#heapifyUp(p);
    }
  }

  #swap(idx: number, idy: number): void {
    const tmp = this.data[idx];
    this.data[idx] = this.data[idy];
    this.data[idy] = tmp;
  }

  #parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  #leftChild(idx: number): number {
    return idx * 2 + 1;
  }

  #rightChild(idx: number): number {
    return idx * 2 + 2;
  }
}
