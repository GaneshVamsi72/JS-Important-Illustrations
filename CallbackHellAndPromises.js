/* JS is Single-threaded !
🔹 What does "single-threaded" mean?
It means JavaScript can do only one thing at a time. It has one call stack, so it executes code line by line, in order.

🔹 Then how does it handle things like delays, API calls, or timers?
JavaScript uses:

*Web APIs* (like setTimeout, fetch)

Event loop

Callback queue

These allow JavaScript to look like it's multitasking, even though the main thread is still single-threaded.

🔹 Synchronous 
One task at a time (step by step, top to bottom).

Code waits for the current line to finish before moving to the next.

Blocking in nature.

🔹 Asynchronous 
Does not wait for the task to finish.

Moves to the next task while the current one completes in the background.

Non-blocking.

Chat GPT -> Callback Hell & Promises Chat ~ May 25 2025
Link -> https://chatgpt.com/share/683c99a4-eb58-8010-bb58-edb1fa317ba4

📍 Callback Hell 
Callback Hell happens when we use too many nested callbacks, especially in asynchronous code, making it:

hard to read 😵

hard to debug 🧩

hard to maintain 🛠️

A Promise is a way to handle asynchronous operations in JavaScript.
It gives you a cleaner alternative to callbacks.

📍 Promises
A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

Why use Promises? -> This is especially for Asynchronous operations involving dependencies of tasks like Database Operations and API calls.........
We use setTimeout(s) in those parts. (Since DB and APIs take some time)
There will be tasks waiting for the result of DB and API operations !!
This leads to dependencies which can lead to Callback Hell !
Since Callback Hell is hard to read, debug, maintain,.... Promises are used !

let promise = new Promise((resolve, reject) => {
  // Do something
});

✅ Promise States
Pending – Initial state, neither fulfilled nor rejected

Fulfilled – Operation completed successfully

Rejected – Operation failed

*/
console.log("------ Promise Object -------");
let promise = new Promise((resolve, reject) => {
  let success = Math.floor(Math.random() * 2);

  if (success) {
    resolve("Task completed!");  // fulfilled
  } else {
    reject("Task failed!");      // rejected
  }
});

promise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

setTimeout(() => {
    console.log("------ Callback Hell ------");
}, 500);

// Problem Illustration 👇
function call1(success, failure) {
    setTimeout(() => {
        console.log("Call 1 done");
        success("Data from call 1");
    }, 1000);
}

function call2(data, success, failure) {
    setTimeout(() => {
        console.log("Call 2 done using:", data);
        success("Data from call 2");
    }, 1000);
}

function call3(data, success, failure) {
    setTimeout(() => {
        console.log("Call 3 done using:", data);
        success("All calls finished!");
    }, 1000);
}

// Callback Hell 😵‍💫👇 -> Pyramid of Doom !
call1(
    (result1) => {
        call2(result1,
            (result2) => {
                call3(result2,
                    (final) => {
                        console.log(final);
                    },
                    (error3) => {
                        console.log("Error:", error3);
                    }
                ); 
            },
            (error2) => {
                console.log("Error:", error2);
            }
        );
    }, 
    (error1) => {
        console.log("Error:", error1);
    }
);

setTimeout(() => {
    console.log("------ Promise Chaining ------");
}, 3500);

/* Solution
🔗 Promise Chaining 
Promise chaining means calling multiple .then() methods one after another.
Each .then() runs after the previous one finishes.

🧠 Why Use It?
To handle multiple async operations in a clean, readable way
(instead of nested callbacks → callback hell).
*/

function step1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Step 1 done");
            resolve("Data from step 1");
        }, 4000);
    });
}

function step2(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Step 2 done using:", data);
            resolve("Data from step 2");
        }, 1000);
    });
}

function step3(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Step 3 done using:", data);
            resolve("All steps finished!");
        }, 1000);
    });
}

// 🔗 Chaining the promises
step1()
  .then((result1) => step2(result1))
  .then((result2) => step3(result2))
  .then((final) => {console.log("✅", final);})
  .catch((error) => {console.log("❌ Error:", error);});

/* Study the Chat GPT's chat named Promise Chaining Explained ~ May 25 2025
Link -> https://chatgpt.com/share/683c99cc-d160-8010-bd33-7be17b3affce

🔧 .then() is specially designed to:
    1. Wait for a promise to resolve.

    2. Run your callback with that resolved value.

    3. Capture whatever your callback returns:

        If you return a plain value, it wraps it in a resolved promise.

        If you return a promise, then .then() returns a new promise that waits for that returned promise to finish.
*/

/*
🧲 .catch() — Who does it belong to?
.catch() is a method that belongs to the Promise.
And !!!!!!!!!!
It is used to handle errors or rejections from any .then() in the promise chain.
*/