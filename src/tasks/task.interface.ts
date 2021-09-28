import { Campaign } from '../campaigns/campaign.interface'
export interface Task {
  id: number
  campaign: Campaign
  lead: string
  created: Date
  updated: Date
  status: string
}
