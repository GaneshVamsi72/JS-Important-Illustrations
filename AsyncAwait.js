// Study the Chat GPT's chat named Async Await ~ 25 May 2025
// Link -> https://chatgpt.com/share/683c9a98-f16c-8010-b474-03ec33c73eff
/*
🔹 What is async?
async is a keyword used to define a function that returns a Promise.

It allows you to write asynchronous code that looks and behaves like synchronous code.
*/

// Why it is said that it behaves like synchronous code?
/*
Inside an async function, you can use await to pause execution until a Promise resolves, making the code flow look and feel like synchronous (top-to-bottom) execution, even though it’s still non-blocking under the hood.
*/
async function greet() {
    return "Hello!";
}

greet().then(msg => console.log(msg)); // Output: Hello!

/*
🔹 What is await?
await is used inside an async function.

It waits for a Promise to resolve before continuing.

It makes your code pause at that line until the result is available.
*/
function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

async function showMessage() {
    await delay(1000);
    console.log("Message 1");
    await delay(2000); // Waits for 2 seconds
    console.log("Message 2 after 2 seconds");
}

showMessage();

/*
🔹 Why use async/await?
Makes code easier to read and understand than using .then() chains.

Looks synchronous, but works asynchronously.
*/
// Illustration

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

async function runSteps() {
    try {
        let result1 = await step1();
        let result2 = await step2(result1);
        let final = await step3(result2);
        console.log("✅", final);
    } catch (error) {
        console.log("❌ Error;", error);
    }
}

runSteps();