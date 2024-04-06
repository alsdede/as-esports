import axios from 'axios'

import { env } from '@/env'

let secondDelay = 60
let count = 0
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let failureCount

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getGameDetailsResponse({ queryKey }: any) {
  const [_, { gameId }] = queryKey
  const date = getISODateMultiplyOf10()
  if (count++ % 10 === 0) {
    failureCount = 0
    secondDelay -= 10
  }

  console.log('gameId', gameId)
  const res = await axios.get(`${env.VITE_API_URL_LIVE}/details/${gameId}`, {
    params: {
      startingTime: date,
    },
    headers: {},
  })

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
