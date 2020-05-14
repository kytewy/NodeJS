console.log("Before");
getUser(1, (user) => {
    getRepo(user.githubusername, (repo) => {
        console.log("Repos", repo);
    })
});

getRepo(1, (username) => {
    console.log("repo", username)
});

console.log("after");

/// Callbacks
// promises
// Async/ Await

/// callback is a function that will be called when the result is ready
function getUser(username, callback) {
    setTimeout(() => {
        console.log("...Reading a user from the database");
        // returns undefined as the database is talking to the database
        callback({ id: id, githubusername: "wyatt"});
        return 
    }, 2000);
};

function getRepo(username, callback) {
    setTimeout(() => {
        console.log("...Reading a user from the git");
        callback( ["repo1", "repo2", "repo3"]);
    }, 2000);
};