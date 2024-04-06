import { Match, Schedule, Team } from '@/pages/app/games/games-list.types'

export function getGameStatus(state: 'completed' | 'unstarted' | 'inProgress') {
  const gameState = {
    completed: 'Finalizado',
    inProgress: 'Em andamento',
    unstarted: 'Não iniciado',
  }

  return gameState[state] || ''
}

export type EventsTable = {
  date: string
  league: string
  teams: Team[]
  result: Team[]
  state: 'completed' | 'unstarted' | 'inProgress'
  record: Team[]
  match: Match
}
export function transformScheduleData(schedule: Schedule) {
  const events = schedule?.events?.map((event) => ({
    date: event.startTime,
    league: event.league.name,
    teams: event.match.teams,
    result: event.match.teams,
    state: event.state,
    record: event.match.teams,
    match: event.match,
  }))

  return events
}

const format = {
  in_game: 'Em andamento',
}
export function formatGameStatus(state: keyof typeof format) {
  return format[state]
}
// ts-ignore
// eslint-disable-next-line
export function goldDiff({ player, windowRes }:any) {
  const blueTeam = windowRes?.frames[windowRes?.frames?.length - 1]?.blueTeam
  const redTeam = windowRes?.frames[windowRes?.frames?.length - 1]?.redTeam
  console.log('dasdsada', player)
  console.log(blueTeam)
  console.log(redTeam)
  let goldDiffReturn
  if (player.participantId < 6) {
    goldDiffReturn =
      player.totalGold -
      redTeam.participants[player.participantId - 1].totalGold
    console.log('gold', player.totalGold, redTeam.participants)
    return goldDiffReturn
  }
  goldDiffReturn =
    player.totalGold - blueTeam.participants[player.participantId - 6].totalGold

  console.log('gold', goldDiffReturn)
  return goldDiffReturn
}
