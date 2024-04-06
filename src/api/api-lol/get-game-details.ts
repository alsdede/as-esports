import axios from 'axios'

import { env } from '@/env'

let secondDelay = 60
let count = 0
let failureCount = 0

export async function getGameDetailsResponse({ queryKey }) {
  const [_, { gameId }] = queryKey
  const date = getISODateMultiplyOf10()
  if (count++ % 10 === 0) {
    failureCount = 0
    secondDelay -= 10
  }

  console.log('gameId', gameId)
  const res = axios.get(`${env.VITE_API_URL_LIVE}/details/${gameId}`, {
    params: {
      startingTime: date,
    },
    headers: {},
  })

  console.log('res', res.data)
  return res.data
}

export function getISODateMultiplyOf10() {
  const date = new Date()
  date.setMilliseconds(0)

  if (date.getSeconds() % 10 !== 0) {
    date.setSeconds(date.getSeconds() - (date.getSeconds() % 10))
  }

  date.setSeconds(date.getSeconds() - secondDelay)

  return date.toISOString()
}
