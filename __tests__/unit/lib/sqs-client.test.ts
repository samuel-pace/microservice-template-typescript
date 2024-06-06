import { beforeAll, describe, expect, it } from '@jest/globals'
import {
  packageBatchesOfEntries,
  sendMultipleMessages,
  serializeEntries,
} from '../../../lib/sqs-client'

describe('sqs client', () => {
  let messages: string[]
  beforeAll(() => {
    messages = Array.from({ length: 15 }, (_, index) => String(index))
  })

  it('serializeEntries function should return a SendMessageBatchRequestEntry array with Id and MessageBody keys', () => {
    const result = serializeEntries(messages)

    expect(result[0]).toHaveProperty('Id')
    expect(result[0]).toHaveProperty('MessageBody')
  })

  it('serializeEntries function should return a SendMessageBatchRequestEntry array with length 15', () => {
    const result = serializeEntries(messages)

    expect(result).toHaveLength(15)
  })

  it('serializeEntries property Id should be a valid timestamp', () => {
    const result = serializeEntries(messages)

    const date = new Date(Number(result[0].Id))

    expect(date).toBeInstanceOf(Date)
  })

  it('packageBatchesOfEntries should return 2 batches(15 entries / 10 per batch), 10 items in first batch and 5 items in second batch', () => {
    const entries = serializeEntries(messages)

    const batchQuantity = Math.ceil(entries.length / 10)

    const result = packageBatchesOfEntries(entries, batchQuantity, 10)

    expect(result).toHaveLength(2)
    expect(result[0]).toHaveLength(10)
    expect(result[1]).toHaveLength(5)
  })

  it('sendMultipleMessages should return successful messages', async () => {
    const products = await sendMultipleMessages(
      'http://localhost:9324/SendProductsQueue-staging',
      messages
    )

    expect(products[0].$metadata.httpStatusCode).toBe(200)
  })
})
