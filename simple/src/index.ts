import { KafkaMessage } from "kafkajs";

export const workingTopic = "confloss_simple_topic";
export const workingGroupId = "confloss-simple-workingGroupId";

export interface Event {
  topic: string;
  partition: number;
  message: KafkaMessage;
}
