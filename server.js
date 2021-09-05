let projectData = {};
let express = require('express');
let path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');
let port =   3000 || process.env.PORT;
let app = express();
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('website'));
app.use(cors());
app.use(jsonParser);




app.post('/insertdata', urlencodedParser, function (req, res,next) {
    
    if(req.body){ 
        projectData = req.body;
    res.send('done !');
 }
    next();
    })
    app.get('/getmostrecentdata' , urlencodedParser, function (req, res, next) {
        res.send(projectData);
    })


app.listen(port , ()=>{
    console.log("server is listening !");
});
