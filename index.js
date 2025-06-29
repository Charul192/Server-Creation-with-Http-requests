const express = require('express');

//ye pehle k liye thaa but ab mujhe users dB mai se lane hain
// const users = require("./MOCK_DATA.json");
const app = express();
const mongoose = require("mongoose");

const PORT = 8000;
const fs = require("fs");

//Connection
//mongoose.connect("URL jo terminal pe ho../db ko ek naam do"); - ek promise return krega
mongoose
    .connect("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(() => console.log("Mongoose Connected"))
    .catch((err) => console.log("Mongo error"));
//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: false,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    gender: {
        type: String,
        required: true,
    },

    ipAddress: {
    type: String,
    required: true
},
    jobTitle: {
    type: String,
    required: false
}
}
//To get created at and updated at time
// , {timestamps: true}
)

//Model
const User = mongoose.model('user', userSchema);


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

// app.get("/users", async (req, res) => {
//     // console.log(req.headers);
//     // res.setHeader("X-MyName", "Charul"); //Custom header
//     //Always add x to custom headers

//     // console.log(req.myUserName);

//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allDbUsers.map((user)=> `<li>${user.firstName} - ${user.email}</li>`)}
//     </ul>
//     `;
//     res.send(html);
// });

// //Routes
// //GET - list all the data
// app.get("/api/users", async (req, res) => {
//     //after using dB
//     const allDbUsers = await User.find({});
    
//     return res.json(allDbUsers);
// })

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     // const user = User.find((user) => user.id === id);
//     // if(!user) return res.status(404).json({msg: "user not found"})
//     // return res.json(user);
// })

//Kyunki inn sbb k routes same hain toh hum ye vi krr skte hain
app.route("/api/users/:id").get(async (req, res) => {
    //pehle hum id ko find krr rhe thee ab ye nhi krenge
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "User not found"});
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    return res.json(user);
}).patch(async (req, res) => {
    //abhi toh hard coded hi h
    await User.findByIdAndUpdate(req.params.id, {lastname: "Changed"});
    return res.json({status: "Success"});
}).delete(async (req, res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"});
})

//asyn bnao when want to insert in mongodB
app.post('/api/users', async (req, res) => {
const body = req.body;
//400 - Bad request
if(!body || !body.first_name || !body.last_name || !body.email || !body.ip_address || !body.gender || !body.job_title){
    return res.status(400).json({msg: "All fields are req..."});
}

const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    ipAddress: body.ip_address,
    gender: body.gender,
    jobTitle: body.job_title,
});

return res.status(201).json(result);
//ye nhi krenge
// users.push({...body, id: users.length + 1});
// fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.status(201).json({status: "success", id: users.length});
})
// }))

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