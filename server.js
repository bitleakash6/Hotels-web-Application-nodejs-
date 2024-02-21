//console.log('server file is running');

// function add(a, b){
//     return a + b;
// }

// var add = function add(a, b){
//     return a + b;
// }

// var add = (a, b) => {
//     return a + b;
// }

// var add = (a,b) => a+b;

// var result = add(5, 7);
// console.log(result)

/* function callback(){
    console.log('prince is calling a callback function')
    //console.log("Hi i am akash")
}

const add = function(a, b, callback){
    var res = a + b;
    console.log('result : '+res)     // main function work complete
    callback();
}
add(3, 2, callback)  */



// const add = function(a, b, callback){
//     var res = a + b;
//     console.log('result : '+res)     // main function work complete
//     callback();
// }

// // add(3,2 , function callback(){
// //     console.log('add completed')
// // });
// add(3,2, ()=> console.log('add completed'))

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user)
// console.log(user.username)

// fs.appendFile('message.txt', 'data to append', () => {
//     console.log('The "data to append" was appended to file!');
// });


// const notes = require('./notes.js')
// var _ = require('lodash');
// console.log('server file is available')

// var age = notes.age;
// var res = notes.addNumber(age+2, 2);
// console.log(age)
// console.log(res)

// var data = ["person", "person", 1, 2, 1, 2, 'name', 'age', '2']
// var filter = _.uniq(data);
// console.log(filter)              //welcome

// app.get('/chiken', (req, res)=>{
//     res.send('Sure I would love to serve chiken')
// })

// app.get('/idli', (req, res)=>{
//     var customised_idli = {
//         name : "rava idli",
//         size : "10 cm diameter",
//         is_sambhar : true,
//         is_chutni : false
//     };
//     res.send(customised_idli)
// });

// app.post('/person', (req, res)=>{
//     res.send('data is saved')
// })

const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());         //req.body

app.get('/', function (req, res) {
    res.send('Welcome to my hotel...')
})


//import the router files
const personRoutes = require('./routes/personRoutes');
//use the routers
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);


app.listen(3000, () => {
    console.log('listening on 3000')
})

