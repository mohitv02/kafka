import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.set('view engine', 'ejs');
app.use(urlencoded());

const name = [];

name.push("Hey")

app.get('/',(req,res)=>{
    res.render('home',{data:name});
});

app.listen(2000,function(){
    console.log("Server Running");
});
