export default class ArrayList {
  length: number;
  #backingArray: Int32Array;

  constructor(length: number, capacity: number) {
    if (length < 0 || length > capacity) {
      throw new Error("invalid arguments");
    }
    this.length = length;
    this.#backingArray = new Int32Array(capacity);
  }

  push(item: number) {
    if (this.length == this.#backingArray.length) {
      this.#growBackingArray();
    }
    this.#backingArray[this.length++] = item;
  }

  pop(): number | undefined {
    if (this.length) {
      return this.#backingArray[--this.length];
    }
  }

  at(index: number): number {
    if (index < 0 || index >= this.length) {
      throw new Error("invalid index");
    }
    return this.#backingArray[index];
  }

  setAt(index: number, item: number): void {
    if (index < 0 || index >= this.length) {
      throw new Error("invalid index");
    }
    this.#backingArray[index] = item;
  }

  toString(): string {
    let s = "";
    for (let i = 0; i < this.length; i++) {
      s += `${this.#backingArray[i]}${i < this.length - 1 ? "," : ""}`;
    }
    return s;
  }

  #growBackingArray() {
    // allocating a new backing array with double capacity
    const newBackingArray = new Int32Array(this.#backingArray.length * 2);

    // move all elements to the new backing array
    for (let i = 0; i < this.length; i++) {
      newBackingArray[i] = this.#backingArray[i];
    }
    // replace the old backing array
    this.#backingArray = newBackingArray;
  }
}
