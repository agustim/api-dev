import request from 'supertest'
import app from '../src/server'
import { Task } from '../src/tasks/task.interface'


// POST test

describe('Post Endpoints', () => {
    it('should create a new post', async () => {

      const task = { campaign: "Test", lead: "lead-test", created: new Date(), updated: new Date(), status: "test-001 "}
      const res = await request(app)
        .post('/api/tasks')
        .send( task )
      expect(res.statusCode).toEqual(201)
      let taskOutput:Task = res.body
      expect(typeof taskOutput.campaign).toEqual("string");
      expect(typeof taskOutput.lead).toEqual("string");
    })
  })