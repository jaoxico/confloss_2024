import { KafkaConnection } from "../kafka/KafkaConnection";
import { Event, workingGroupId, workingTopic } from "../index";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";

const consumer = KafkaConnection.consumer({
  groupId: workingGroupId,
});

const registry = new SchemaRegistry({
  host: "http://localhost:8081/",
});

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: workingTopic, fromBeginning: true });
  await consumer.run({
    autoCommit: true,
    eachMessage: async (event: Event) => {
      const { message } = event;
      const { value } = message;
      console.log("raw message");
      console.log(value);
      const decodedMessage = await registry.decode(value || Buffer.alloc(0));
      console.log("decodedMessage");
      console.log(decodedMessage);
    },
  });
};

run().catch((reason) => {
  console.error("reason");
  console.error(reason);
});
