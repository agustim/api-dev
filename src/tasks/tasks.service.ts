import { Task } from './task.interface'
import { Tasks } from './tasks.interface'

let tasks: Tasks = {
  1: {
    id: 1,
    lead: 'user1@example.com',
    campaign: 'captacio',
    created: new Date(),
    updated: new Date(),
    status: 'apte',
  },
  2: {
    id: 2,
    lead: 'user2@example.com',
    campaign: 'captacio',
    created: new Date(),
    updated: new Date(),
    status: '1r-mail',
  },
  3: {
    id: 3,
    lead: 'user3@example.com',
    campaign: 'captacio',
    created: new Date(),
    updated: new Date(),
    status: 'apte',
  },
  4: {
    id: 4,
    lead: 'user4@example.com',
    campaign: 'captacio',
    created: new Date(),
    updated: new Date(),
    status: 'apte',
  },
}

export const findAll = async (): Promise<Task[]> => {
  return Object.values(tasks)
}

export const find = async (id: number): Promise<Task> => {
  return tasks[id]
}

export const findByStatus = async (status: string): Promise<Task[]> => {
  let tasksByStatus: Task[] = []
  for (const task of Object.values(tasks)) {
    if (task.status == status) {
      tasksByStatus.push(task)
    }
  }
  return tasksByStatus
}

export const create = async (newTask: Task): Promise<Task> => {
  const id = new Date().valueOf()

  const ara = new Date()
  tasks[id] = {
    ...newTask,
    id,
    created: ara,
    updated: ara,
  }

  return tasks[id]
}

export const updateStatus = async (
  id: number,
  status: string,
): Promise<Task | null> => {
  const task = await find(id)

  if (!task) {
    return null
  }

  const updated = new Date()
  tasks[id] = { ...task, status, updated }

  return tasks[id]
}

export const update = async (
  id: number,
  taskUpdate: Task,
): Promise<Task | null> => {
  const task = await find(id)

  if (!task) {
    return null
  }

  const updated = new Date()
  tasks[id] = { ...taskUpdate, id, updated }

  return tasks[id]
}

export const remove = async (id: number): Promise<null | void> => {
  const task = await find(id)

  if (!task) {
    return null
  }

  delete tasks[id]
}
