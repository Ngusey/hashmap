// Node represents one key-value pair.
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array(capacity).fill(null);
    this.count = 0;
  }

  // Convert a string key into a bucket index.
  hash(key) {
    if (typeof key !== "string") {
      throw new TypeError("Keys must be strings");
    }

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i))
        % this.capacity;
    }

    return hashCode;
  }

  // Prevent access outside the bucket array.
  checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  // Find a node using its key.
  findNode(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    let current = this.buckets[index];

    while (current !== null) {
      if (current.key === key) {
        return current;
      }

      current = current.next;
    }

    return null;
  }

  // Insert a new pair or update an existing pair.
  set(key, value) {
    const index = this.hash(key);
    this.checkIndex(index);

    let current = this.buckets[index];

    if (current === null) {
      this.buckets[index] = new Node(key, value);
    } else {
      while (current !== null) {
        if (current.key === key) {
          current.value = value;
          return;
        }

        if (current.next === null) {
          current.next = new Node(key, value);
          break;
        }

        current = current.next;
      }
    }

    this.count++;

    if (this.count > this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  // Retrieve a value using its key.
  get(key) {
    const node = this.findNode(key);
    return node === null ? null : node.value;
  }

  // Check whether a key exists.
  has(key) {
    return this.findNode(key) !== null;
  }

  // Remove a key-value pair.
  remove(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    let current = this.buckets[index];
    let previous = null;

    while (current !== null) {
      if (current.key === key) {
        if (previous === null) {
          this.buckets[index] = current.next;
        } else {
          previous.next = current.next;
        }

        this.count--;
        return true;
      }

      previous = current;
      current = current.next;
    }

    return false;
  }

  // Return the number of stored pairs.
  length() {
    return this.count;
  }

  // Remove everything.
  clear() {
    this.buckets = Array(this.capacity).fill(null);
    this.count = 0;
  }

  // Return all keys.
  keys() {
    const result = [];

    for (const bucket of this.buckets) {
      let current = bucket;

      while (current !== null) {
        result.push(current.key);
        current = current.next;
      }
    }

    return result;
  }

  // Return all values.
  values() {
    const result = [];

    for (const bucket of this.buckets) {
      let current = bucket;

      while (current !== null) {
        result.push(current.value);
        current = current.next;
      }
    }

    return result;
  }

  // Return all key-value pairs.
  entries() {
    const result = [];

    for (const bucket of this.buckets) {
      let current = bucket;

      while (current !== null) {
        result.push([current.key, current.value]);
        current = current.next;
      }
    }

    return result;
  }

  // Double capacity and redistribute existing entries.
  resize() {
    const oldEntries = this.entries();

    this.capacity *= 2;
    this.buckets = Array(this.capacity).fill(null);
    this.count = 0;

    for (const [key, value] of oldEntries) {
      this.set(key, value);
    }
  }
}

export default HashMap;