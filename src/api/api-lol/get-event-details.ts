import axios from 'axios'

import { env } from '@/env'

type Team = {
  code: string
  id: string
  image: string
  name: string
  result: {
    gameWins: number
  }
}
type Strategy = {
  count: number
}
type League = {
  id: string
  image: string
  name: string
  slug: string
}
type Event = {
  match: {
    games: any
    strategy: Strategy
    teams: Team[]
  }
  id: string
  type: string
  league: League
  streams: string[]
}
export interface GetEventResponse {
  data: { event: Event }
}
export async function getEventDetails({ queryKey }) {
  const [_, id] = queryKey

  const res = await axios.get<GetEventResponse>(
    `${env.VITE_API_URL_PERSISTED}/getEventDetails`,
    {
      params: {
        hl: 'en-US',
        id,
      },
      headers: {
        'x-api-key': env.VITE_API_KEY,
      },
    },
  )

  return res.data.data.event
}
