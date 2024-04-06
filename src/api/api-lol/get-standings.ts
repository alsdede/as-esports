import axios from 'axios'

import { env } from '@/env'

export function getStandingsResponse(tournamentId: string) {
  return axios.get(`${env.VITE_API_URL_PERSISTED}/getStandings`, {
    params: {
      hl: 'en-US',
      tournamentId,
    },
    headers: {
      'x-api-key': env.VITE_API_KEY,
    },
  })
}
