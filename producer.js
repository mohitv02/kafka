import { Kafka } from "kafkajs";
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


console.log("Started");

var msg;
app.post('/',function(req,res){
    msg = req.body.name;
    console.log(msg)
    if(req.body.submit_button)
        run();
        // console.log(msg)
})

// const msg = process.argv[2];
// run();

async function run()
{
    try
    {
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers":["127.0.0.1:9092"]
        })

        const producer = kafka.producer();

        console.log("Connecting....")
        await producer.connect();
        console.log("Connected!")
        
        // partition = 0;
        const result = await producer.send({
            "topic":"Users",
            "messages":[
                {
                    "value":msg,
                    "partition":0
                }
            ]
        })
        
        console.log(`Message added!! - ${JSON.stringify(result)} ${msg}`)
        await producer.disconnect();
    }
    catch(ex)
    {
        console.log(`Error ${ex}`)
    }
    // finally
    // {
    //     process.exit(0);
    // }
}

app.listen(3000,function(){
    console.log("Server Running");
});
