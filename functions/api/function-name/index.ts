import DefaultResponses from '../../../lib/responses'

export const handler = async (event) => {
  console.log('event: -------->', JSON.stringify(event))
  const a = { message: 'Mensagem' }
  const response = new DefaultResponses()
  return response.ok(a)
}
