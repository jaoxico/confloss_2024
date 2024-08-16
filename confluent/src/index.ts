import { KafkaMessage } from "kafkajs";

export const workingTopic = "confluent_confloss_2024";
export const workingGroupId = "confloss-workingGroupId";

export interface Event {
  topic: string;
  partition: number;
  message: KafkaMessage;
}
