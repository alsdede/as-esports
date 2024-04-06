import { useQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { getScheduleResponse } from '@/api/api-lol/get-schedule'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFilter } from '@/context/filterContext'
import { getGameStatus, transformScheduleData } from '@/utils'
import { makeData, Person } from '@/utils/makeData'

import { columns } from './columns'
import { League, Team } from './games-list.types'
import { GamesListFilters } from './games-list-filters'
import { DataTable } from './table'

export function GamesList() {
  // const { filter } = useFilter()
  // const [sorting, setSorting] = useState<SortingState>([
  //   {
  //     id: 'league' ?? '',
  //     desc: true,
  //   },
  // ])
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  // const [rowSelection, setRowSelection] = useState({})
  const [search, setSearch] = useState('')
  const [leagues, setLeagues] = useState<any[]>([])

  const { data: schedule, isLoading } = useQuery({
    queryKey: ['schedule'],
    queryFn: getScheduleResponse,
  })

  console.log('schedule', schedule)
  const data = useMemo(() => transformScheduleData(schedule) ?? [], [schedule])

  console.log('data', data)
  if (isLoading || !schedule) return <div>loading</div>
  console.log('data', data[0])
  return (
    <>
      <Helmet title="Jogos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Jogos</h1>

        <div className="space-y-2.5">
          {/* <GamesListFilters leagues={leagues} table={table} /> */}
          <div className="rounded-md border">
            <DataTable columns={columns} data={data} />
            {/* <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[105px]">Hora</TableHead>
                  <TableHead className="w-[140px]">Liga</TableHead>
                  <TableHead className="w-[300px]">Times</TableHead>
                  <TableHead className="w-[100px]">Resultado</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead className="w-[85px]">Live</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule?.events.map((event, i) => {
                  const existingLeague = leagues.find(
                    (league) => league.name === event.league.name,
                  )

                  if (!existingLeague) {
                    setLeagues([...leagues, event.league])
                  }

                  return (
                    <TableRow key={i} className=" cursor-pointer">
                      <TableCell className="text-cs font-mono font-medium">
                        {format(new Date(event?.startTime), 'HH:mm')}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {event.league?.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col  gap-1">
                          <div className="flex items-center gap-2">
                            <span className="h-8 w-8 rounded-full rounded-sm bg-slate-900 p-1">
                              <img
                                src={event.match?.teams[0].image}
                                alt={event.match?.teams[0].name}
                              />
                            </span>
                            <span className="font-medium text-muted-foreground">
                              {event.match?.teams[0].name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="h-8 w-8 rounded-full rounded-sm bg-slate-900 p-1">
                              <img
                                src={event.match?.teams[1].image}
                                alt={event.match?.teams[1].name}
                              />
                            </span>
                            <span className="font-medium text-muted-foreground">
                              {event.match?.teams[1].name}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-1">
                          <span>{event.match?.teams[0].result?.gameWins}</span>
                          <span>{event.match?.teams[1].result?.gameWins}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-4 w-4 rounded-full ${event.state === 'completed' ? 'bg-green-400' : event.state === 'unstarted' ? 'bg-red-400' : 'bg-slate-400'}`}
                          />
                          <span className="font-medium text-muted-foreground">
                            {getGameStatus(event.state)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table> */}
          </div>
          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
