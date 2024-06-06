import { describe, expect, it } from '@jest/globals'
import DefaultResponses from '../../../lib/responses'

const body = { message: 'message' }
const response = new DefaultResponses()
describe('DefaultResponses class', () => {
  it('should return body type string and statusCode 200', () => {
    const res = response.ok(body)

    expect(res.statusCode).toEqual(200)
    expect(res).toHaveProperty('body')
    expect(typeof res.body).toEqual('string')
  })

  it('should return statusCode 400', () => {
    const res = response.badRequest(body)

    expect(res.statusCode).toEqual(400)
  })

  it('should return statusCode 201', () => {
    const res = response.created(body)

    expect(res.statusCode).toEqual(201)
  })

  it('should return statusCode 204', () => {
    const res = response.noContent(body)

    expect(res.statusCode).toEqual(204)
  })

  it('should return statusCode 404', () => {
    const res = response.notFound(body)

    expect(res.statusCode).toEqual(404)
  })
  it('should return statusCode 422', () => {
    const res = response.unprocessableEntity(body)

    expect(res.statusCode).toEqual(422)
  })
})
