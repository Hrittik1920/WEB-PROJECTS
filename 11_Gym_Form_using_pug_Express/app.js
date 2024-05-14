const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;

// For serving static files (MIDDLEWARES)
app.use('/static',express.static('static'));
app.use(express.urlencoded())

// Setting Template Engines as pug
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));

app.get("/", (req,res) => {
    res.status(200).render('index');
})

app.get("/",(req,res) => {
    res.status(200).send("This is the home page of the express website");
})


app.post("/", (req,res) => {
    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const address = req.body.address;
    const more = req.body.more;
    const outputToWrited = `\nThe name of the client is ${name},${age} years old,${gender}, residing at ${address}, More about him/her ${more}`;
    fs.appendFileSync('output.txt',outputToWrited);
    res.status(200).render("demo",{
        message : "Your form has been succesfully submitted!"
    });
})


app.listen(port,() => {
    console.log(`We are hosting our site on http://localhost:${port}`);
})
