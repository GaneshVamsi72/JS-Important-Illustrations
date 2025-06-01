/*
Refer Chat GPT's chat named APIs ~ 25 May 2025
Link -> https://chatgpt.com/share/683c9add-499c-8010-9ad7-dab9a157e11f

An API (Application Programming Interface) is a set of rules that allows two software applications to talk to each other.

-> An API defines how different software components should interact.
-> It allows developers to use features of another system without knowing the internal details.


JSON (JavaScript Object Notation) is a lightweight data format used to store and exchange data between a server and a client.

-> JSON.parse(data) Method - To parse a string data into a JS object
-> JSON.stringify(json) Method - To parse a JS object data into JSON


AJAX stands for Asynchronous JavaScript And XML.
It is a technique used in web development to send and receive data from a server without reloading the web page.

-> AJAX allows a webpage to update content (like weather info, search suggestions, or new comments) without refreshing the whole page.


Https Verbs (or Methods) define the type of action you want to perform on a server resource using an API.
Here are the most common ones:

1. GET
📦 Use: To read/fetch data from the server.

❌ No data is sent in the body.

✅ Safe & used in most API calls.

2. POST
📝 Use: To create a new resource on the server.

✅ Sends data in the request body.

3. PUT
🔁 Use: To update a resource completely.

Replaces the existing data.

4. PATCH
✂️ Use: To partially update a resource.

Only changes the fields you send.

5. DELETE
❌ Use: To delete a resource from the server.

🌐 HTTP Status Codes
HTTP status codes are 3-digit numbers sent by the server to tell you what happened with your request.

✅ Common Status Codes:
🔹 200 OK
Everything worked perfectly.

🔹 201 Created
Something was successfully created (like a user).

🔹 204 No Content
Success, but no data is returned.

🔹 400 Bad Request
You sent invalid data.

🔹 401 Unauthorized
You need to log in or provide a valid token.

🔹 403 Forbidden
You’re not allowed to access this.

🔹 404 Not Found
The URL doesn’t exist.

🔹 500 Internal Server Error
Something went wrong on the server.

🔗 Adding Information in URLs (Query Strings)
A query string lets you send extra data to the server by adding it to the end of a URL.

Format: <url>?key1=value1&key2=value2

📄 What are HTTP Headers?
HTTP headers are extra pieces of information sent with every request (Request Headers) or response (Response Headers) between client (browser) and server.

They describe things like:
-> What type of data is being sent or expected
-> Authorization info
-> Language, cookies, caching, etc.

*/

let url1 = "https://catfact.ninja/fact";

// fetch using then() and catch()
fetch(url1)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.fact);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// fetch using async and await
async function getCatFact(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data.fact);
    } catch (error) {
        console.log("Error:", error);
    }
}

getCatFact(url1);

/*
⚡ Using Axios
Axios is a JavaScript library used to make HTTP requests (like GET, POST, etc.), just like fetch()—but with simpler syntax, automatic JSON parsing, and better error handling.

✅ If using in HTML:
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
*/

async function getCatFacts(url) {
    try {   
        let response = await axios.get(url);
        console.log(response.data.fact);   
    } catch (error) {
        console.log("Error:", error);
    }
}

getCatFacts(url1); 

/*
📤 Sending Headers with API Requests
When making API requests, sometimes you need to send headers—like for authentication, content type, or language.
*/

// Using fetch() with Headers

let url2 = "https://icanhazdadjoke.com/"; // This API url's default response format is text/html (HTML response)! (For more details refer below text)
/*
API response format:-
All API endpoints follow their respective browser URLs, but we adjust the response formatting to be more suited for an API based on the provided HTTP Accept header.

Accepted Accept headers:
-> text/html - HTML response (default response format)
-> application/json - JSON response
-> text/plain - Plain text response
Note: Requests made via curl which do not set an Accept header will respond with text/plain by default.
*/

async function getAJoke(url) {
    try {
        let confg1 = {
            headers: {
                Accept: "text/plain"
            }
        };

        let response1 = await axios.get(url, confg1);
        console.log("Joke Format1 :", response1.data);

        let confg2 = {
            headers: {
                Accept: "application/json"
            }
        };

        let response2 = await axios.get(url, confg2);
        console.log("Joke Format2: ", response2.data);
    } catch (error) {
        console.log("Error:", error);
    }   
}

getAJoke(url2);