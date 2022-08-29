const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.send("It works!");
});

const port = process.env.Port || 5000; 

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})