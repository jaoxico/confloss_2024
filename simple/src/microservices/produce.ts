import * as http from "node:http";
import { KafkaConnection } from "../kafka/KafkaConnection";
import { workingTopic } from "../index";
import { randomUUID } from "node:crypto";

const producer = KafkaConnection.producer({
  allowAutoTopicCreation: false,
  transactionalId: "my-producer",
  idempotent: true,
});

const server = http.createServer();
server.on("request", async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 403;
    res.write("Método não permitido!");
    res.end();
    return;
  }
  let postedData = "";
  req.on("data", (chunk) => {
    postedData += chunk;
  });
  req.on("resume", async () => {
    await producer.connect();
    await producer.send({
      topic: workingTopic,
      messages: [
        {
          headers: { from: "producer-message-header" },
          key: randomUUID(),
          value: postedData,
        },
      ],
    });
    await producer.disconnect();
    console.log(postedData);
  });
  req.on("end", async () => {
    res.end();
  });
});
server.listen(3000);
console.log("http://localhos:3000");
