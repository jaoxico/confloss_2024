import { KafkaConnection } from './kafka/KafkaConnection'
import { KafkaMessage } from 'kafkajs'

const workingTopic = 'test-topic'
const workingGroupId = 'test-workingGroupId'

interface Event {
  topic: string
  partition: number
  message: KafkaMessage
}

const run = async () => {
  const admin = KafkaConnection.admin()
  await admin.connect()
  if (!(await admin.listTopics()).includes(workingTopic))
    await admin.createTopics({
      topics: [{ topic: 'test-topic' }]
    })
  await admin.disconnect()

  const consumer = KafkaConnection.consumer({ groupId: workingGroupId })
  await consumer.connect()
  await consumer.subscribe({ topic: workingTopic })
  await consumer.run({
    eachMessage: async (event: Event) => {
      const { topic, partition, message } = event
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value?.toString()
      })
    }
  })
  // // Producing
  // await producer.connect()
  // await producer.send({
  //   topic: 'test-topic',
  //   messages: [{ value: 'Hello KafkaJS user!' }]
  // })
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
}

run().catch(console.error)
