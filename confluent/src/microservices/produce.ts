import * as http from "node:http";
import { KafkaConnection } from "../kafka/KafkaConnection";
import { workingTopic } from "../index";
import { createHash, randomUUID } from "node:crypto";
import { SchemaRegistry, SchemaType } from "@kafkajs/confluent-schema-registry";
import { RegisteredSchema } from "@kafkajs/confluent-schema-registry/dist/SchemaRegistry";
import { readFileSync } from "fs";
import { ConfluentSchemaRegistryValidationError } from "@kafkajs/confluent-schema-registry/dist/errors";

const producer = KafkaConnection.producer({
  allowAutoTopicCreation: false,
  transactionalId: "my-producer",
  idempotent: true,
});

const registry = new SchemaRegistry({
  host: "http://localhost:8081/",
});

const server = http.createServer();
let schema: RegisteredSchema;
server.on("listening", async () => {
  schema = await registry.register({
    type: SchemaType.AVRO,
    schema: readFileSync("../schemas/palestras.avsc").toString(),
  });
  console.log("schema");
  console.log(schema);
});
server.on("request", async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 403;
    res.write("Método não permitido!");
    res.end();
    return;
  }
  let postedData = "";
  req.on("data", (chunk) => {
    postedData += chunk.toString();
  });
  req.on("error", (error) => {
    console.log("error");
    console.log(error);
  });
  req.on("end", async () => {
    try {
      const parsedPostedData = JSON.parse(postedData.toString());
      console.log(parsedPostedData);
      console.log("schema.id");
      console.log(schema.id);
      // Serializando a mensagem
      const messageValue = await registry.encode(schema.id, parsedPostedData);
      console.log("messageValue");
      console.log(messageValue);
      await producer.connect();
      await producer.send({
        topic: workingTopic,
        messages: [
          {
            headers: {
              from: "producer-message-header",
              hash: createHash("md5")
                .update(Buffer.from(messageValue))
                .digest("hex"),
              version: "1.0.0",
              type: "fct",
            },
            key: randomUUID(),
            value: messageValue,
          },
        ],
      });
      await producer.disconnect();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          data: "Mensagem adicionada ao tópico",
        }),
      );
    } catch (error) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.write((error as ConfluentSchemaRegistryValidationError).message);
      console.log((error as ConfluentSchemaRegistryValidationError).message);
    }
    res.end();
  });
  // req.on("end", async () => {
  //   res.end();
  // });
});
server.listen(3000);
console.log("http://localhos:3000");
