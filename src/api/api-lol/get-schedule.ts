import axios from 'axios'

import { env } from '@/env'
import { Schedule } from '@/pages/app/games/games-list.types'

interface GetScheduleResponse {
  data: { schedule: Schedule }
}
export async function getScheduleResponse() {
  const response = await axios.get<GetScheduleResponse>(
    `${env.VITE_API_URL_PERSISTED}/getSchedule?hl=en-US`,
    {
      headers: {
        'x-api-key': env.VITE_API_KEY,
      },
    },
  )

  return response.data.data.schedule
}
