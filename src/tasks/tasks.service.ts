import { Task } from './task.interface'
import tasks from './tasks.data'

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

export const findByStatusDate = async (
  status: string,
  date: Date,
): Promise<Task[]> => {
  let tasksByStatus: Task[] = []

  for (const task of Object.values(tasks)) {
    if (task.status == status && task.updated <= date) {
      tasksByStatus.push(task)
    }
  }
  return tasksByStatus
}

export const findByCampaignStatus = async (
  id: number,
  status: string,
): Promise<Task[]> => {
  let tasksByCampaignStatus: Task[] = []

  for (const task of Object.values(tasks)) {
    if (
      (status == '' || task.status == status) &&
      task.campaign &&
      task.campaign.id &&
      task.campaign.id == id
    ) {
      tasksByCampaignStatus.push(task)
    }
  }
  return tasksByCampaignStatus
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

export const updateDays = async (
  id: number,
  days: number,
): Promise<Task | null> => {
  const task = await find(id)

  if (!task) {
    return null
  }

  const updated = new Date(new Date().setDate(new Date().getDate() - days))
  tasks[id] = { ...task, updated }

  return tasks[id]
}

export const remove = async (id: number): Promise<null | void> => {
  const task = await find(id)

  if (!task) {
    return null
  }

  delete tasks[id]
}
