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

        const admin = kafka.admin();

        console.log("Connecting....")
        await admin.connect();
        console.log("Connected!")

        await admin.createTopics({
            "topics":[{
                "topic":"Users",
                "numPartitions":2
            },
            {
                "topic":"Users",
                "numPartitions":2
            }]
        })
        console.log("Topic created!!")
        await admin.disconnect();
    }
    catch(ex)
    {
        console.log(`Error ${ex}`)
    }
    finally
    {
        process.exit(0);
    }
}