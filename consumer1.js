import { Kafka } from "kafkajs";
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.set('view engine', 'ejs');
app.use(urlencoded());


console.log("Started");

const name = [];

app.get('/',(req,res)=>{
    res.render('home',{data:name});
});
// document.getElementById("demo1").innerHTML = name;
run();

async function run()
{
    try
    {
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers":["127.0.0.1:9092"]
        })

        const consumer = kafka.consumer({"groupId":"test"});

        console.log("Connecting....")
        await consumer.connect();
        console.log("Connected!")
        
        await consumer.subscribe({
            "topic":"Users",
            "fromBeginning":true
        })
        
        await consumer.run({
            "eachMessage":async result =>{
                name.push(result.message.value);
                
                console.log(`Received msg ${result.message.value} `)
            }
        })

        // console.log(`Message added!! - ${JSON.stringify(result)} ${msg}`)
        // await consumer.disconnect();
    }
    catch(ex)
    {
        console.log(`Error ${ex}`)
    }
}
app.listen(2000,function(){
    console.log("Server Running");
});

