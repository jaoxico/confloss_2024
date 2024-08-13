import { KafkaMessage } from "kafkajs";

export const workingTopic = "confloss_2024";
export const workingGroupId = "test-workingGroupId";

interface Event {
  topic: string;
  partition: number;
  message: KafkaMessage;
}
