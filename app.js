import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(urlencoded());

app.get('/',function(req,res){
    res.send(`
    <form action="/" method="POST">
        <input type="text" name="name" placeholder="Enter Name"/>
        <input type="submit" name="submit_button" value="Add"/>
    </form>
    `);
});

app.post('/',function(req,res){
    const msg = req.body.name;
    console.log(msg);
})

app.listen(3000,function(){
    console.log("Server Running");
});
