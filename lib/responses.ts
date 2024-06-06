type Params = {
  statusCode: number
  body?: Record<string, unknown>
  headers?: Record<string, unknown>
}

export type Response = Omit<Params, 'body'> & {
  body: string
}

export default class DefaultResponses {
  private response(params: Params): Response {
    const { statusCode, body, headers } = params

    return {
      statusCode,
      headers,
      body: JSON.stringify(body),
    }
  }

  ok(body?: Record<string, unknown>, headers?: Record<string, unknown>) {
    return this.response({ statusCode: 200, body, headers })
  }

  created(body?: Record<string, unknown>, headers?: Record<string, unknown>) {
    return this.response({ statusCode: 201, body, headers })
  }

  noContent(headers?: Record<string, unknown>) {
    return this.response({ statusCode: 204, headers })
  }

  notFound(body?: Record<string, unknown>, headers?: Record<string, unknown>) {
    return this.response({ statusCode: 404, body, headers })
  }

  badRequest(body?: Record<string, unknown>, headers?: Record<string, unknown>) {
    return this.response({ statusCode: 400, body, headers })
  }

  unprocessableEntity(body?: Record<string, unknown>, headers?: Record<string, unknown>) {
    return this.response({ statusCode: 422, body, headers })
  }
}
