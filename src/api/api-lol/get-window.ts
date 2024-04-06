import axios from 'axios'

import { env } from '@/env'

import { getISODateMultiplyOf10 } from './get-game-details'

export async function getWindowResponse(id: string) {
  //   const [_, { id, date }] = queryKey
  console.log('idres', id)
  const date = getISODateMultiplyOf10()
  const response = await axios.get(`${env.VITE_API_URL_LIVE}/window/${id}`, {
    params: {
      startingTime: date,
    },
    headers: {},
  })

  console.log('response,response', response)
  return response.data
}
