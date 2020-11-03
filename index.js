const express = require("express");

const app = express();
const port = process.env.PORT || 5000
const student = require("./student");

app.route("/").get((req, res) => {
    res.send("Welcome to first page");
});

app.route("/api/data").get((req, res) => {
    res.json(student);
});


//help to convert the json data
app.use(express.json());

app.route("/api/data").post((req, res) => {
    if (!req.body.address) {
        res.status(400).json({ error: "address is required..." });
    } else if (!req.body.name) {
        res.status(400).json({ error: "name is required..." });
    } else {
        const user = {
            id: req.body.id + 1,
            name: req.body.name,
            age: req.body.age,
            address: req.body.address
        }
        console.log(req.body);
        student.push(user);
        res.json(user);
    }
});

app.route("/api/data/:id").put((req, res) => {
    //read 
    let id = req.params.id;
    let name = req.body.name;
    let age = req.body.age;
    let address = req.body.address

    //find

    let index = student.findIndex((student) => {
        return (student.id == Number.parseInt(id));
    });

    if (index >= 0) {
        let std = student[index];
        std.name = name;
        std.age = age;
        std.address = address

        res.json(std);
    } else {
        res.status(404).send("404 error");
    }



})

app.route("/api/data/:id").delete((req, res) => {
    let id = req.params.id;
    let index = student.findIndex((student) => {
        return (student.id == Number.parseInt(id));
    });

    if (index >= 0) {
        let std = student[index];
        student.splice(index, 1);

        res.json(std);
    } else {
        res.status(404).send("error");
    }

})

app.listen(port, () => {
    console.log(`Connecting Server at ${port}`);
});