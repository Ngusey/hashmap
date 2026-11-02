import HashMap from "./hashMap.js";

const test = new HashMap();

// Insert the 12 entries required by TOP.
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// Check initial storage.
console.log("Initial length:", test.length());
console.log("Initial capacity:", test.capacity);

// Update existing entries.
test.set("apple", "green");
test.set("banana", "blue");

console.log("Updated apple:", test.get("apple"));
console.log("Length after updates:", test.length());

// Insert 13th entry to trigger resizing.
test.set("moon", "silver");

console.log("Length after resizing:", test.length());
console.log("New capacity:", test.capacity);

// Test other methods.
console.log("Get apple:", test.get("apple"));
console.log("Has banana:", test.has("banana"));
console.log("Has orange:", test.has("orange"));

console.log("Remove dog:", test.remove("dog"));
console.log("Length after removal:", test.length());

console.log("All keys:", test.keys());
console.log("All values:", test.values());
console.log("All entries:", test.entries());

// Test clear.
test.clear();

console.log("Length after clear:", test.length());
console.log("Entries after clear:", test.entries());

const collisionTest = new HashMap();

collisionTest.set("a", 100);
collisionTest.set("q", 200);

console.log("Collision test:", collisionTest.get("a"), collisionTest.get("q"));
console.log("Collision length:", collisionTest.length());