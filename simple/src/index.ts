import { KafkaMessage } from "kafkajs";

export const workingTopic = "test-topic";
export const workingGroupId = "test-workingGroupId";

interface Event {
  topic: string;
  partition: number;
  message: KafkaMessage;
}

// const run = async () => {
//   const admin = KafkaConnection.admin();
//   await admin.connect();
//   if (!(await admin.listTopics()).includes(workingTopic))
//     await admin.createTopics({
//       topics: [{ topic: "test-topic" }],
//     });
//   await admin.disconnect();
//
//   // Producing
//   const producer = KafkaConnection.producer({
//     allowAutoTopicCreation: true,
//     createPartitioner: Partitioners.LegacyPartitioner,
//   });
//   await producer.connect();
//   await producer.send({
//     topic: workingTopic,
//     messages: [{ value: "Produced message!" }],
//   });
//   await producer.disconnect();
//
//   const consumer = KafkaConnection.consumer({
//     groupId: workingGroupId,
//     allowAutoTopicCreation: true,
//   });
//   await consumer.connect();
//   await consumer.subscribe({ topic: workingTopic });
//   await consumer.run({
//     // eachBatchAutoResolve: false,
//     // eachBatch: async ({
//     //   batch,
//     //   resolveOffset,
//     //   heartbeat,
//     //   isRunning,
//     //   isStale,
//     // }) => {
//     //   for (const message of batch.messages) {
//     //     if (!isRunning() || isStale()) break;
//     //     console.log(message);
//     //     resolveOffset(message.offset);
//     //     await heartbeat();
//     //   }
//     // },
//     eachMessage: async (event: Event) => {
//       const { topic, partition, message } = event;
//       console.log({
//         topic,
//         partition,
//         offset: message.offset,
//         value: message.value?.toString(),
//       });
//     },
//   });
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
// };

// run().catch(console.error);
