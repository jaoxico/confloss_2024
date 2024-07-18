import { Kafka } from 'kafkajs'

export const KafkaConnection = new Kafka({
  clientId: 'confloss_2024',
  brokers: ['localhost:9092']
})
