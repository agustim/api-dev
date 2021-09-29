import express, { Request, Response } from 'express'
import * as CampaignsService from './campaignes.service'
import { Campaign } from './campaign.interface'

export const campaignsRouter = express.Router()

// GET campaigns/

campaignsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const campaigns: Campaign[] = await CampaignsService.findAll()

    res.status(200).send(campaigns)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})
