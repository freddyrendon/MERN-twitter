const express = require("express");
const app = express();
const mongoose = require("mongoose")
const db = require("./config/keys").mongoURI /// import keys
const users = require("./routes/api/users")
const tweets = require("./routes/api/tweets")


// connect to MongoDB using Mongoose
mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));


// ROOT route
app.get("/", (req, res) => {
    //debugger
    // console.log(res); 
    res.send("It works!");
});

// Tell Express to use your imported routes
app.use("/api/users", users)
app.use("/api/tweets", tweets)

// test
// http://localhost:5000/api/users/test


const port = process.env.Port || 5000; 


// tell Express to start a socket and listen for connections on the path
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})