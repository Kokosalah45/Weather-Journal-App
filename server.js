let projectData = [];
let express = require('express');
let path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');

let app = express();
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(express.static('website'));
app.use(cors());
app.use(jsonParser);




app.post('/insertdata', urlencodedParser, function (req, res,next) {
    console.log(req.body);
    if(req.body){ projectData.push(req.body);
    res.send('done !');
 }
    next();
    })
    app.get('/getmostrecentdata' , urlencodedParser, function (req, res, next) {
        res.send(projectData[projectData.length - 1]);
    })


app.listen(3000 , ()=>{
    console.log("server is listening !");
});
