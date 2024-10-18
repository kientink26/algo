type SNode<T> = {
  value: T;
  next?: SNode<T>;
};

export default class Stack<T> {
  length: number;
  head?: SNode<T>;

  constructor() {
    this.head = undefined;
    this.length = 0;
  }

  push(item: T) {
    this.length++;
    const snode: SNode<T> = { value: item, next: this.head };
    this.head = snode;
  }

  pop(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    this.length--;
    const v = this.head.value;
    this.head = this.head.next;
    return v;
  }

  peak(): T | undefined {
    return this.head?.value;
  }
}
