import express, { Request, Response } from 'express'
import * as TasksService from './tasks.service'
import { Task } from './task.interface'

export const tasksRouter = express.Router()

// GET tasks/

tasksRouter.get('/', async (req: Request, res: Response) => {
  try {
    const tasks: Task[] = await TasksService.findAll()

    res.status(200).send(tasks)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// GET tasks/:id

tasksRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)

  try {
    const task: Task = await TasksService.find(id)

    if (task) {
      res.status(200).send(task)
      return
    }

    res.status(404).send('task not found')
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// GET tasks/by-status/:status

tasksRouter.get('/by-status/:status', async (req: Request, res: Response) => {
  const status: string = req.params.status
  try {
    const tasks: Task[] = await TasksService.findByStatus(status)

    res.status(200).send(tasks)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// GET tasks/by-status-days/:status/:daysBefore

tasksRouter.get(
  '/by-status-days/:status/:daysBefore',
  async (req: Request, res: Response) => {
    const status: string = req.params.status
    const days: number = parseInt(req.params.daysBefore, 10)

    let dateCalculate = new Date()
    dateCalculate.setDate(dateCalculate.getDate() - days)

    try {
      const tasks: Task[] = await TasksService.findByStatusDate(
        status,
        dateCalculate,
      )

      res.status(200).send(tasks)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  },
)

// Only test
// GET tasks/by-status-minutes/:status/:minutesBefore

tasksRouter.get(
  '/by-status-minutes/:status/:minutesBefore',
  async (req: Request, res: Response) => {
    const status: string = req.params.status
    const minutes: number = parseInt(req.params.minutesBefore, 10)

    let dateCalculate = new Date()
    dateCalculate.setMinutes(dateCalculate.getMinutes() - minutes)

    try {
      const tasks: Task[] = await TasksService.findByStatusDate(
        status,
        dateCalculate,
      )

      res.status(200).send(tasks)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  },
)

// GET tasks/by-campaign/:campaign

tasksRouter.get(
  '/by-campaign/:campaign',
  async (req: Request, res: Response) => {
    const campaign: number = parseInt(req.params.campaign, 10)
    try {
      const tasks: Task[] = await TasksService.findByCampaignStatus(
        campaign,
        '',
      )

      res.status(200).send(tasks)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  },
)

// GET tasks/by-campaign-status/:campaign/:status

tasksRouter.get(
  '/by-campaign-status/:campaign/:status',
  async (req: Request, res: Response) => {
    const campaign: number = parseInt(req.params.campaign, 10)
    const status: string = req.params.status

    try {
      const tasks: Task[] = await TasksService.findByCampaignStatus(
        campaign,
        status,
      )

      res.status(200).send(tasks)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  },
)

// GET tasks/by-email/:email
tasksRouter.get('/by-email/:email', async (req: Request, res: Response) => {
  const email: string = req.params.email
  try {
    const tasks: Task[] = await TasksService.findByEmailCampaign(email, null)

    res.status(200).send(tasks)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})
// GET tasks/by-email-campaign/:email/:campaign
tasksRouter.get(
  '/by-email-campaign/:email/:campaign',
  async (req: Request, res: Response) => {
    const email: string = req.params.email
    const campaign: number = parseInt(req.params.campaign, 10)
    try {
      const tasks: Task[] = await TasksService.findByEmailCampaign(
        email,
        campaign,
      )

      res.status(200).send(tasks)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  },
)

// POST tasks

tasksRouter.post('/', async (req: Request, res: Response) => {
  try {
    const task: Task = req.body

    const newTask = await TasksService.create(task)

    res.status(201).json(newTask)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// PUT tasks/:id

tasksRouter.put('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)

  try {
    const taskUpdate: Task = req.body

    const existingTask: Task = await TasksService.find(id)

    if (existingTask) {
      const updatedTask = await TasksService.update(id, taskUpdate)
      res.status(200).json(updatedTask)
      return
    }

    const newTask = await TasksService.create(taskUpdate)

    res.status(201).json(newTask)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// PUT tasks/:id/status/:status

tasksRouter.put('/:id/status/:status', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)
  const status: string = req.params.status

  try {
    const existingTask: Task = await TasksService.find(id)

    if (existingTask) {
      const updatedTask = await TasksService.updateStatus(id, status)
      res.status(200).json(updatedTask)
      return
    }
    res.status(500).send('This task is not exist.')
    return
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// Only test!!!
// PUT tasks/:id/sub-days/:day

tasksRouter.put('/:id/sub-days/:days', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)
  const days: number = parseInt(req.params.days, 10)

  try {
    const existingTask: Task = await TasksService.find(id)

    if (existingTask) {
      const updatedTask = await TasksService.updateDays(id, days)
      res.status(200).json(updatedTask)
      return
    }
    res.status(500).send('This task is not exist.')
    return
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// DELETE tasks/:id

tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10)
    await TasksService.remove(id)

    res.sendStatus(204)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})
