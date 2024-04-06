/* eslint-disable */
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { EventsTable, getGameStatus } from '@/utils'

import {  League, Result, State, Team } from './games-list.types'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<EventsTable>[] = [
  {
    accessorKey: 'date',
    sortingFn: (rowA, rowB) => {
      const date1 = new Date(
        '1970-01-01T' + rowA.original.date.substr(11, 8) + 'Z',
      )
      const date2 = new Date(
        '1970-01-01T' + rowB.original.date.substr(11, 8) + 'Z',
      )

      // Treat "24:00" as equivalent to "00:00" of the next day
      if (date1.getHours() === 0 && date1.getMinutes() === 0) {
        date1.setDate(date1.getDate() + 1)
      }
      if (date2.getHours() === 0 && date2.getMinutes() === 0) {
        date2.setDate(date2.getDate() + 1)
      }

      return date1.getTime() - date2.getTime()
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Hora
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue('date') as string

      return (
        <TableCell className="text-cs font-mono font-medium">
          {format(new Date(date), 'HH:mm')}
        </TableCell>
      )
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'league',

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Liga
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const league = row.getValue('league') as League["name"]

      return <TableCell className="font-medium">{league}</TableCell>
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'teams',

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          disabled
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Times
          {/* <ArrowUpDown className="ml-2 h-3 w-3" /> */}
        </Button>
      )
    },
    cell: ({ row }) => {
      const teams = row.getValue('teams') as Team []

      return (
        <TableCell>
          <div className="flex flex-col  gap-1">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-sm  bg-slate-900 p-1">
                <img src={teams[0].image} alt={teams[0].name} />
              </span>
              <span className="font-medium text-muted-foreground">
                {teams[0].name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-8 w-8  rounded-sm bg-slate-900 p-1">
                <img src={teams[1].image} alt={teams[1].name} />
              </span>
              <span className="font-medium text-muted-foreground">
                {teams[1].name}
              </span>
            </div>
          </div>
        </TableCell>
      )
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'result',
    header: ({ column }) => {
      return (
        <Button
          disabled
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Resultado
          {/* <ArrowUpDown className="ml-2 h-3 w-3" /> */}
        </Button>
      )
    },
    cell: ({ row }) => {
      type ResultType = {
        result: Result
      }
      const result = row.getValue('result')  as ResultType []

      return (
        <TableCell className="font-medium">
          <div className="flex flex-col gap-1">
            <span>{result[0].result?.gameWins}</span>
            <span>{result[1].result?.gameWins}</span>
          </div>
        </TableCell>
      )
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'state',

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const state = row.getValue('state')

      return (
        <TableCell>
          <div className="flex items-center gap-2">
            <span
              className={`h-4 w-4 rounded-full ${state === 'completed' ? 'bg-green-400' : state === 'unstarted' ? 'bg-red-400' : 'bg-slate-400'}`}
            />
            <span className="font-medium text-muted-foreground">
              {getGameStatus(state as State["state"])}
            </span>
          </div>
        </TableCell>
      )
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'live',
    header: 'Live',
    cell: () => {
      return <TableCell className="font-medium"></TableCell>
    },
    footer: (props) => props.column.id,
  },
]
