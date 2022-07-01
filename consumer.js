import { Kafka } from "kafkajs";

console.log("Started");

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