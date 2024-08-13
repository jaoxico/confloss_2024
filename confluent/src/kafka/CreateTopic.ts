import { KafkaConnection } from "./KafkaConnection";

export const CreateTopic = async (topic: string): Promise<void> => {
  const admin = KafkaConnection.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [{ topic }],
  });
  await admin.disconnect();
};
