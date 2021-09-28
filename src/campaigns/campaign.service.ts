import { Campaign } from './campaign.interface'
import campaigns from './campaings.data'

export const findAll = async (): Promise<Campaign[]> => {
  return Object.values(campaigns)
}

export const find = async (id: number): Promise<Campaign> => {
  return campaigns[id]
}

export const findByStatus = async (status: string): Promise<Campaign[]> => {
  let campaignsByStatus: Campaign[] = []
  for (const campaign of Object.values(campaigns)) {
    if (campaign.status == status) {
      campaignsByStatus.push(campaign)
    }
  }
  return campaignsByStatus
}

export const findByTag = async (tag: string): Promise<Campaign[]> => {
  let campaignsByTag: Campaign[] = []
  for (const campaign of Object.values(campaigns)) {
    let tags = campaign.tags.split('|')
    if (tags.includes(tag)) {
      campaignsByTag.push(campaign)
    }
  }
  return campaignsByTag
}

export const create = async (newCampign: Campaign): Promise<Campaign> => {
  const id = new Date().valueOf()

  const ara = new Date()
  campaigns[id] = {
    ...newCampign,
    created: ara,
    updated: ara,
  }

  return campaigns[id]
}

export const updateStatus = async (
  id: number,
  status: string,
): Promise<Campaign | null> => {
  const campaign = await find(id)

  if (!campaign) {
    return null
  }

  const updated = new Date()
  campaigns[id] = { ...campaign, status, updated }

  return campaigns[id]
}

export const update = async (
  id: number,
  campaignUpdate: Campaign,
): Promise<Campaign | null> => {
  const campaign = await find(id)

  if (!campaign) {
    return null
  }

  const updated = new Date()
  campaigns[id] = { ...campaignUpdate, updated }

  return campaigns[id]
}

export const remove = async (id: number): Promise<null | void> => {
  const campaign = await find(id)

  if (!campaign) {
    return null
  }

  delete campaigns[id]
}

export const addTag = async (
  id: number,
  tag: string,
): Promise<Campaign | null> => {
  const campaignUpdate = await find(id)

  if (!campaignUpdate) {
    return null
  }

  const updated = new Date()

  let tags: string[] = campaignUpdate.tags.split('|')

  tags.push(tag)

  campaigns[id] = { ...campaignUpdate, updated, tags: tags.join('|') }

  return campaigns[id]
}

export const remTag = async (
  id: number,
  tag: string,
): Promise<Campaign | null> => {
  const campaignUpdate = await find(id)

  if (!campaignUpdate) {
    return null
  }

  const updated = new Date()

  let tags: string[] = campaignUpdate.tags.split('|')

  tags = tags.filter(item => item !== tag)

  campaigns[id] = { ...campaignUpdate, updated, tags: tags.join('|') }

  return campaigns[id]
}
