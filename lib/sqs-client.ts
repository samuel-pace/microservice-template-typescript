import {
  SQSClient,
  SQSClientConfig,
  SendMessageBatchCommand,
  SendMessageBatchRequestEntry,
} from '@aws-sdk/client-sqs'

const options: SQSClientConfig = {
  region: 'us-east-1',
}

const client = new SQSClient(options)

export const sendMultipleMessages = async (queueUrl: string, messages: string[]) => {
  const entrieMaxLength = 10
  const entrieQuantity = Math.ceil(messages.length / entrieMaxLength) // max 10 messages per block

  const serializedEntries = serializeEntries(messages)

  const batchOfEntries = packageBatchesOfEntries(serializedEntries, entrieQuantity, entrieMaxLength)
  const allEntries = batchOfEntries.map((entrie) => {
    const input = {
      QueueUrl: queueUrl,
      Entries: entrie,
    }
    const command = new SendMessageBatchCommand(input)
    return client.send(command)
  })

  return await Promise.all(allEntries)
}

export const serializeEntries = (messages: string[]): SendMessageBatchRequestEntry[] =>
  messages.map((message, index) => ({
    Id: `${index}-${String(new Date().getTime())}`,
    MessageBody: message,
  }))

export const packageBatchesOfEntries = (
  entries: SendMessageBatchRequestEntry[],
  entriesQuantity: number,
  entrieMaxLength: number
) =>
  Array.from({ length: entriesQuantity }, (_, index) => {
    const currentIndex = index * entrieMaxLength
    return entries.slice(currentIndex, currentIndex + entrieMaxLength)
  })
