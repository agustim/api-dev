import { Tasks } from './tasks.interface'
import campaigns from '../campaigns/campaings.data'

let tasks: Tasks = {
  1: {
    id: 1,
    lead: 'user1@example.com',
    campaign: campaigns[1],
    created: new Date(new Date().setDate(new Date().getDate() - 5)),
    updated: new Date(new Date().setDate(new Date().getDate() - 5)),
    status: 'apte',
  },
  2: {
    id: 2,
    lead: 'user2@example.com',
    campaign: campaigns[1],
    created: new Date(),
    updated: new Date(),
    status: '1r-mail',
  },
  3: {
    id: 3,
    lead: 'user3@example.com',
    campaign: campaigns[1],
    created: new Date(),
    updated: new Date(),
    status: 'apte',
  },
  4: {
    id: 4,
    lead: 'user4@example.com',
    campaign: campaigns[2],
    created: new Date(),
    updated: new Date(),
    status: 'apte',
  },
}

export default tasks
