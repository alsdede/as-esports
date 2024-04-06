export type BaseStrategy = {
  count: 1 | 3 | 5 | 7
  type: string
}
export type League = {
  name: string
  slug: string
}
export type Record = {
  losses: number
  wins: number
}
export type Result = {
  gameWins: number
  outcome?: 'loss' | 'win'
}

export type Team = {
  code: string
  image: string
  name: string
  record: Record
  result: Result
  id: string
}

// export type Game = {
//   id: string
//   number: 1 | 2 | 3 | 4 | 5
//   state: 'completed' | 'unstarted' | 'inProgress' | 'unneeded'
//   teams: CustomTeam[]
//   vods: ExtendedVod[]
// }
export type Match = {
  id: string
  flags: string[]
  strategy: BaseStrategy
  teams: Team[]
}
export type Event = {
  blockName: string
  league: League
  match: Match
  startTime: string
  state: 'completed' | 'unstarted' | 'inProgress'
  type: string
}

export type Schedule = {
  events: Event[]
  pages: {
    older: string
    newer: string
  }
}

export type GameListTable = {
  hour: string
  league: string[]
  teams: string
  result: string
  state: 'completed' | 'unstarted' | 'inProgress'
  live: string
  action: string
}
