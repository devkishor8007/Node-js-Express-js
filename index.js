const express = require("express");

const app = express();
const port = process.env.PORT || 5000
const student = require("./student");

app.route("/").get((req, res) => {
    res.send("Welcome to first page");
});

app.route("/api/info").get((req, res) => {
    res.json(student);
});


//help to convert the json data
app.use(express.json());

app.route("/api/data").post((req, res) => {
    if (!req.body.class) {
        res.status(400).json({ error: "class is required..." });
    } else if (!req.body.name) {
        res.status(400).json({ error: "name is required..." });
    } else {
        const user = {
            name: req.body.name,
            age: req.body.age,
            class: req.body.class
        }
        console.log(req.body);
        student.push(user);
        res.json(user);
    }
});


app.listen(port, () => {
    console.log(`Connecting Server at ${port}`);
});