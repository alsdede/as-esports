/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { getEventDetails } from '@/api/api-lol/get-event-details'
import { getWindowResponse } from '@/api/api-lol/get-window'
import BaronIcon from '@/components/icons/BaronIcon'
import GoldIcon from '@/components/icons/GoldIcon'
import InhibitorIcon from '@/components/icons/InhibitorIcon'
import KillsIcon from '@/components/icons/KillsIcon'
import TowerIcon from '@/components/icons/TowerIcon'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { env } from '@/env'
import { formatGameStatus, goldDiff } from '@/utils'

import { HealthBar } from './health-bar'

const ICONS = [
  {
    id: '1',
    name: 'inhibitors',
    icon: <InhibitorIcon />,
    total: 2,
  },
  {
    id: '2',
    name: 'barons',
    icon: <BaronIcon />,
    total: 1,
  },
  {
    id: '3',
    name: 'towers',
    icon: <TowerIcon />,
    total: 5,
  },
  {
    id: '4',
    name: 'totalGold',
    icon: <GoldIcon />,
    total: 65000,
  },
  {
    id: '5',
    name: 'totalKills',
    icon: <KillsIcon />,
    total: 20,
  },
]
const reversedICONS = [...ICONS].reverse()
export function Game() {
  const [windowRes, setWindowRes] = useState<any>([])
  const id = '111561319410825193'
  // const date = getISODateMultiplyOf10()
  const { data: eventDetails, isLoading: isLoadingEventDetails } = useQuery({
    queryKey: ['event-details', id],
    queryFn: getEventDetails,
    refetchInterval: 5000,
  })
  // const {
  //   data: windowRes,
  //   isLoading: isLoadingWindow,
  //   refetch: refetchWindow,
  // } = useQuery({
  //   queryKey: ['window-res', { id: eventDetails?.match.games[1].id, date }],
  //   queryFn: getWindowResponse,
  //   refetchInterval: 500,
  //   gcTime: 500,
  //   staleTime: 0,
  //   retry: true,
  //   retryDelay: 500,
  // })
  // const {
  //   data: itemsRes,
  //   isLoading: isLoadingItems,
  //   refetch: refetchItems,
  // } = useQuery({
  //   queryKey: ['items', { metadata: windowRes?.gameMetadata }],
  //   queryFn: getItemsResponse,
  // })
  // const { data: gameDetails, isLoading: isLoadingGameDetails } = useQuery({
  //   queryKey: ['game-details', { gameId: eventDetails?.match.games[0].i }],
  //   queryFn: getGameDetailsResponse,
  // })
  console.log(eventDetails?.match.games[2].id)
  useEffect(() => {
    getWindowResponse('111561319410825197').then((res) => setWindowRes(res))

    const interval = setInterval(() => {
      getWindowResponse('111561319410825197').then((res) => setWindowRes(res))
    }, 500)

    return () => clearInterval(interval)
  }, [eventDetails, windowRes])

  const teamA = eventDetails?.match.teams[0]
  const teamB = eventDetails?.match.teams[1]

  if (windowRes !== undefined || windowRes !== isNaN) {
    console.log('windowRes?.gameMetadata', windowRes)
  }
  // const blueTeam = windowRes?.frames[windowRes?.frames?.length - 1]?.blueTeam
  // const redTeam = windowRes?.frames[windowRes?.frames?.length - 1]?.redTeam

  // console.log('RED', redTeam)
  return (
    <>
      <Helmet title={`LIVE `} />
      {isLoadingEventDetails ? (
        <div>loading</div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex w-full flex-col  rounded border p-4">
            <div className="flex h-full w-full flex-row items-center justify-center ">
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-md bg-slate-800  p-2">
                  <img src={teamA?.image} alt={teamA?.name} />
                </div>
                <div>
                  <span className=" font-bold">{teamA?.name}</span>
                </div>
                <div className="flex  flex-row items-center justify-center gap-8  rounded border p-2 ">
                  {' '}
                  {ICONS.map((icon) => {
                    const blueTeam =
                      windowRes?.frames[windowRes?.frames?.length - 1]?.blueTeam
                    return (
                      <div
                        className="flex flex-col items-center justify-center "
                        key={icon.id}
                      >
                        <div className="h-4 w-4 ">{icon.icon}</div>
                        <span>{blueTeam[icon.name]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex w-auto flex-col items-center justify-center whitespace-nowrap p-0">
                <h1 className="text-2xl font-bold tracking-tight">
                  {eventDetails?.league.name}
                </h1>
                <span className="text-xl font-bold">
                  {' '}
                  {teamA?.result?.gameWins} x {teamB?.result?.gameWins}
                </span>

                <span className="text-2xl font-bold">VS</span>
                <div className="flex flex-row items-center justify-center rounded-full bg-slate-400 px-2 py-1 text-xs font-bold">
                  <Clock className="mr-1 h-4 w-4" />
                  31:25
                </div>
                <span>
                  {/* <span className="text-xs text-muted-foreground">
                    {' '}
                    STATUS:
                  </span> */}

                  {formatGameStatus(
                    windowRes?.frames[windowRes?.frames?.length - 1]?.gameState,
                  )}
                </span>
              </div>
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-md bg-slate-800 p-2">
                  <img src={teamB?.image} alt={teamB?.name} />
                </div>
                <div>
                  <span className=" font-bold">{teamB?.name}</span>
                </div>
                <div className="flex  flex-row items-center justify-center gap-8  rounded border p-2">
                  {reversedICONS.map((icon) => {
                    const redTeam =
                      windowRes?.frames[windowRes?.frames?.length - 6]?.redTeam
                    return (
                      <div
                        className="flex flex-col items-center justify-center "
                        key={icon.id}
                      >
                        <div className="h-4 w-4 ">{icon.icon}</div>
                        <span>{redTeam[icon.name]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div></div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-40 text-lg">{teamA?.name}</TableHead>
                  <TableHead className="w-[140px] text-center">VIDA</TableHead>
                  <TableHead className="w-[200px] text-center">ITEMS</TableHead>
                  <TableHead className="w-[60px] p-2 text-center">CS</TableHead>
                  <TableHead className="w-[60px] p-2 text-center">K</TableHead>
                  <TableHead className="w-[60px] p-2 text-center">D</TableHead>
                  <TableHead className="w-[60px] p-2 text-center">A</TableHead>
                  <TableHead className="w-[85px] text-center">GOLD</TableHead>
                  <TableHead className="w-[85px] text-center">DIFF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {windowRes?.frames[
                  windowRes?.frames?.length - 1
                ]?.blueTeam?.participants.map((player, index) => {
                  return (
                    <TableRow className=" cursor-pointer" key={index}>
                      <TableCell className="text-cs px-4 py-1 font-mono font-medium">
                        <div className="flex flex-col  gap-1">
                          <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 rounded-lg bg-slate-900 p-0">
                              <img
                                className="roundend-lg"
                                src={`${env.VITE_CHAMPIONS_URL}${windowRes?.gameMetadata.blueTeamMetadata.participantMetadata[player.participantId - 1].championId}.png`}
                                alt={'karma'}
                              />
                              <div className="absolute -bottom-2 -right-1 rounded-sm bg-slate-800 p-px text-xs text-slate-200 dark:bg-slate-800 dark:text-cyan-500">
                                {player.level}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-muted-foreground">
                                {
                                  windowRes?.gameMetadata.blueTeamMetadata
                                    .participantMetadata[
                                    player.participantId - 1
                                  ].championId
                                }
                              </span>
                              <span className="text-xs font-bold text-muted-foreground dark:text-cyan-500">
                                {
                                  windowRes?.gameMetadata.blueTeamMetadata
                                    .participantMetadata[
                                    player.participantId - 1
                                  ].summonerName
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-1 text-center">
                        <HealthBar
                          currentHealth={player.currentHealth}
                          maxHealth={player.maxHealth}
                        />
                      </TableCell>
                      <TableCell className="  p-1">
                        {/* <Items
                          playerId={player?.participantId}
                          itemsFrame={
                            windowRes?.frames[windowRes?.frames?.length - 1]
                              .blueTeam.participants[player?.participantId]
                          }
                          items={itemsRes}
                        /> */}
                      </TableCell>
                      <TableCell className="p-1 text-center font-bold">
                        {player.creepScore}
                      </TableCell>
                      <TableCell className="p-1 text-center font-bold">
                        {player.kills}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {player.deaths}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {player.assists}
                      </TableCell>
                      <TableCell className="text-center font-bold text-yellow-500">
                        {player.totalGold}
                      </TableCell>
                      <TableCell
                        className={`text-center ${goldDiff({ player, windowRes }) < 0 ? 'text-red-600' : 'text-green-600'}`}
                      >
                        {goldDiff({ player, windowRes })}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-40 text-lg">{teamB.name}</TableHead>
                  <TableHead className="w-[140px] text-center">VIDA</TableHead>
                  <TableHead className="w-[200px] text-center">ITEMS</TableHead>
                  <TableHead className="w-[60px] p-2 text-center">CS</TableHead>
                  <TableHead className="w-[60px] p-2 text-center">K</TableHead>
                  <TableHead className="w-[60px] p-2 text-center">D</TableHead>
                  <TableHead className="w-[60px] p-2 text-center">A</TableHead>
                  <TableHead className="w-[85px] text-center">GOLD</TableHead>
                  <TableHead className="w-[85px] text-center">DIFF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {windowRes?.frames[
                  windowRes?.frames?.length - 1
                ]?.redTeam?.participants.map((player, index) => {
                  return (
                    <TableRow className=" cursor-pointer" key={index}>
                      <TableCell className="text-cs px-4 py-1 font-mono font-medium">
                        <div className="flex flex-col  gap-1">
                          <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 rounded-lg bg-slate-900 p-0">
                              <img
                                className="roundend-lg"
                                src={`${env.VITE_CHAMPIONS_URL}${windowRes?.gameMetadata.redTeamMetadata.participantMetadata[player.participantId - 6].championId}.png`}
                                alt={'karma'}
                              />
                              <div className="absolute -bottom-2 -right-1 rounded-sm bg-slate-800 p-px text-xs text-red-500 dark:bg-slate-800 dark:text-red-400">
                                {player.level}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-muted-foreground">
                                {
                                  windowRes?.gameMetadata.redTeamMetadata
                                    .participantMetadata[
                                    player.participantId - 6
                                  ].championId
                                }
                              </span>
                              <span className="text-xs font-bold text-muted-foreground dark:text-red-400">
                                {
                                  windowRes?.gameMetadata.redTeamMetadata
                                    .participantMetadata[
                                    player.participantId - 6
                                  ].summonerName
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-1 text-center">
                        <HealthBar
                          currentHealth={player.currentHealth}
                          maxHealth={player.maxHealth}
                        />
                      </TableCell>
                      <TableCell className="  p-1">
                        {/* <Items
                          playerId={player?.participantId}
                          itemsFrame={
                            windowRes?.frames[windowRes?.frames?.length - 6]
                              .blueTeam.participants[player?.participantId]
                          }
                          items={itemsRes}
                        /> */}
                      </TableCell>
                      <TableCell className="p-1 text-center font-bold">
                        {player.creepScore}
                      </TableCell>
                      <TableCell className="p-1 text-center font-bold">
                        {player.kills}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {player.deaths}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {player.assists}
                      </TableCell>
                      <TableCell className="text-center font-bold text-yellow-500">
                        {player.totalGold}
                      </TableCell>
                      <TableCell
                        className={`text-center ${goldDiff({ player, windowRes }) < 0 ? 'text-red-600' : 'text-green-600'}`}
                      >
                        {goldDiff({ player, windowRes })}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  )
}
