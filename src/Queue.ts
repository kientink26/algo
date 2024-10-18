type QNode<T> = {
  value: T;
  next?: QNode<T>;
};

export default class Queue<T> {
  length: number;
  head?: QNode<T>;
  tail?: QNode<T>;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    this.length++;
    const qnode: QNode<T> = { value: item };

    if (!this.tail) {
      // if it's an empty queue
      this.head = this.tail = qnode;
    } else {
      this.tail = this.tail.next = qnode;
    }
  }

  dequeue(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    this.length--;
    const v = this.head.value;
    this.head = this.head.next;
    if (this.length == 0) {
      this.tail = undefined;
    }
    return v;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
