const express = require('express');
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
const fs = require("fs");

//MiddleWare- plugin
//ye pehle h so ye pehle call hogaa aur apne next mei our middleware ko point krega
app.use(express.urlencoded({extended: false}));

//Our middleware 
// app.use((req, res, next) => {....})
app.use( (req, res, next) => {
    //agar sirf ye likha toh to vo apne paas hold krke rkh rha h naa toh aage pass krr rha h aur naa hi end
    console.log("Hello from Middleware 1");

    //agar humne yahan kuch changes kiye req function mei toh vo aage vi available hogaa
    req.myUserName = "Charul";

    //iss se vo end hi krr dega
    // return 
    // res.json({msg : "Hello from Middleware 1"});
    //agar hume aage jaana h toh hum sirf next() likh denge ye apne aap samaj jaayega ki next konsa h
    next();
})

app.get("/users", (req, res) => {
    console.log(req.myUserName);
    const html = `
    <ul>
        ${users.map((user)=> `<li>${user.first_name}</li>`)}
    </ul>
    `;
    res.send(html);
});

//Routes
//GET - list all the data
app.get("/api/users", (req, res) => {
    return res.json(users);
})

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

//Kyunki inn sbb k routes same hain toh hum ye vi krr skte hain
app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
}).patch((req, res) => {
    return res.json({status: "pending"});
}).delete((req, res)=>{
    return res.json({status: "pending"});
})

app.post('/api/users', ((req, res) => {
const body = req.body;
users.push({...body, id: users.length + 1});
fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.json({status: "success", id: users.length});
})
}))

// app.patch('/api/users/:id', ((req, res) => {
//     //TODO: Update user
//     return res.json({status: "pending"});
// }))

// app.delete('/api/users/:id', ((req, res) => {
//     //TODO: Delete user
//     return res.json({status: "pending"});
// }))

app.listen(PORT, () => {
    console.log(`server started at Port ${PORT}`);
})