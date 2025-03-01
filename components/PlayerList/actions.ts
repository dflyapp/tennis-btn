'use server'

import { purgeCache } from '@netlify/functions'

import {
  addFemalePlayer,
  addMalePlayer,
  updateFemalePlayerById,
  updateMalePlayerById,
} from 'db/queries'

export async function updatePlayer(model: string, id: number, data: any) {
  if (model === 'players_female') {
    await updateFemalePlayerById(id, data)
  }

  if (model === 'players_male') {
    await updateMalePlayerById(id, data)
  }
}

export async function addPlayer(model: string, data: any) {
  if (model === 'players_female') {
    await addFemalePlayer(data)
  }

  if (model === 'players_male') {
    await addMalePlayer(data)
  }
}

export async function manualClearCache() {
  console.log('Purging everything')
  await purgeCache()
}
