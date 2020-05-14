const p = new Promise((resolve, reject) => {
    // Kick off some async work, pass 1 which is the result of async operations
    setTimeout(() => {
        resolve(1); // pending to resolve
        reject(new Error("message")); // pending to reject
    }, 2000)
    
});

// Chaining together
p
    .then(result => console.log("Result", result))
    .catch(err => console.log("Error", err.message));