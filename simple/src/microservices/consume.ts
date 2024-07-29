import { KafkaConnection } from "../kafka/KafkaConnection";
import { workingGroupId, workingTopic } from "../index";

const consumer = KafkaConnection.consumer({ groupId: workingGroupId });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: workingTopic, fromBeginning: true });
  await consumer.run({
    eachMessage: async (event) => {
      const { topic, partition, message } = event;
      console.log(`message: ${JSON.stringify(message)}`);
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
    },
  });
};

run().catch(console.error);
