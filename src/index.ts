import { KafkaConnection } from "./kafka/KafkaConnection";
import { KafkaMessage } from "kafkajs";

const workingTopic = "test-topic";
const workingGroupId = "test-workingGroupId";

interface Event {
  topic: string;
  partition: number;
  message: KafkaMessage;
}

const run = async () => {
  const admin = KafkaConnection.admin();
  await admin.connect();
  if (!(await admin.listTopics()).includes(workingTopic))
    await admin.createTopics({
      topics: [{ topic: "test-topic" }],
    });
  await admin.disconnect();

  // Producing
  const producer = KafkaConnection.producer({ allowAutoTopicCreation: true });
  await producer.connect();
  await producer.send({
    topic: workingTopic,
    messages: [{ value: "Hello KafkaJS user!" }],
  });
  await producer.disconnect();

  const consumer = KafkaConnection.consumer({
    groupId: workingGroupId,
    allowAutoTopicCreation: true,
  });
  await consumer.connect();
  await consumer.subscribe({ topic: workingTopic });
  await consumer.run({
    eachMessage: async (event: Event) => {
      const { topic, partition, message } = event;
      console.log(typeof message.value);
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
    },
  });
  // await consumer.disconnect();

  //
  // // Consuming
  // await consumer.connect()
  // await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  //
  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log({
  //       topic,
  //       partition,
  //       offset: message.offset,
  //       value: message.value?.toString()
  //     })
  //   }
  // })
};

run().catch(console.error);
