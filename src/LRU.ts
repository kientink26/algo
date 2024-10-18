type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

export default class LRU<K, V> {
  length: number;
  head?: Node<V>;
  tail?: Node<V>;
  lookup: Map<K, Node<V>>;
  reverseLookup: Map<Node<V>, K>;
  capacity: number;

  constructor(capacity = 10) {
    this.capacity = capacity;
    this.length = 0;
    this.head = this.tail = undefined;
    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }

  set(key: K, value: V): void {
    // check che cache for existence
    let node = this.lookup.get(key);
    if (!node) {
      // if key not found then insert a new node
      // and trim the tail if necessary
      node = { value };
      this.#prepend(node);
      this.#trimCache();

      this.lookup.set(key, node);
      this.reverseLookup.set(node, key);
    } else {
      // else just move it to the front of the link list
      // and update the value
      this.#detach(node);
      this.#prepend(node);
      node.value = value;
    }
  }

  get(key: K): V | undefined {
    // check che cache for existence
    const node = this.lookup.get(key);
    if (!node) {
      return undefined;
    }
    // move it to the front of the link list
    this.#detach(node);
    this.#prepend(node);

    return node.value;
  }

  #detach(node: Node<V>): void {
    this.length--;

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
  }

  #prepend(node: Node<V>): void {
    this.length++;

    node.prev = undefined;
    node.next = this.head;
    this.head && (this.head.prev = node);
    this.head = node;
    this.tail = this.tail || node;
  }

  #trimCache(): void {
    if (this.length <= this.capacity) {
      return;
    }
    const tail = this.tail!;
    this.#detach(tail);

    const key = this.reverseLookup.get(tail);
    this.lookup.delete(key!);
    this.reverseLookup.delete(tail);
  }
}
