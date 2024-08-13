import { KafkaConnection } from "../kafka/KafkaConnection";
import { workingGroupId, workingTopic } from "../index";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";

const consumer = KafkaConnection.consumer({ groupId: workingGroupId });

const registry = new SchemaRegistry({
  host: "http://localhost:8081/",
});

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: workingTopic, fromBeginning: true });
  await consumer.run({
    eachMessage: async (event) => {
      console.log("event");
      console.log(event);
      const { message, partition } = event;
      const { value, offset, key, headers } = message;
      console.log("message data");
      console.log({
        partition,
        headers,
        offset,
        key,
        value: value?.toString("base64"),
      });
      const decodedMessage = await registry.decode(value || Buffer.alloc(0));
      console.log("decodedMessage");
      console.log(decodedMessage);
    },
  });
};

run().catch(console.error);
