const express = require('express')
const hbs = require('hbs');
const fs = require('fs')
const port = process.env.PORT || 3000;

var app = express();   //declaring the app 
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('toCaps',(text)=>{
    return text.toUpperCase();
})

app.set('view engine', 'hbs');   //app.set(key value pair)


app.use((req,res,next)=>{
    var now = new Date().toString()
    var serverStatus= `${now}: ${req.method} ${req.url}`
    console.log(serverStatus)
    fs.appendFile('server.logs', serverStatus + '\n', (err)=>{
        if (err){
            console.log('Unable to write Server Logs.')
        }
    })
    next();
})

// app.use((req, res, next)=>{
//     res.render('maintain.hbs')
// })
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    //res.send('Hey its Express.js')
//    res.send({
//         name: 'Dranzer',
//         Hobbies: [
//             'Cricket',
//             'Football',
//             'Travelling'
//         ],
//     })
res.render('home.hbs',{
    pageTitle: 'Dranzer',
    
})
})

app.get('/about', (req,res)=>{
    //res.send('Express.js is great library')
    res.render('about.hbs',{
        pageTitle: 'Information on us',
        
    })
})
app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Bad Request' 
    })
})

app.listen(port, ()=>{
    console.log(`Server is running on localhost ${port}`)
})