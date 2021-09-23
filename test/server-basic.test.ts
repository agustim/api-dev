import request from 'supertest'
import app from '../src/server'

describe('Test PingController', () => {
  it('Request /ping should return {status :Pong!', async () => {
    const result = await request(app)
      .get('/ping')
      .send()
      .set('Accept', 'application/json')

    expect(result.status).toBe(200)
    expect(result.body.data).toBe('pong')
  })
})
