import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { GamesListFilters } from './games-list-filters'

export function GamesList() {
  return (
    <>
      <Helmet title="Jogos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Jogos</h1>

        <div className="space-y-2.5">
          <GamesListFilters />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[85px]">Hora</TableHead>
                  <TableHead className="w-[140px]">Liga</TableHead>
                  <TableHead className="w-[300px]">Times</TableHead>
                  <TableHead className="w-[100px]">Resultado</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead className="w-[85px]">Live</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-cs font-mono font-medium">
                      16:00
                    </TableCell>
                    <TableCell className="text-muted-foreground">LCK</TableCell>
                    <TableCell>
                      <div className="flex flex-col  gap-1">
                        <div className="flex items-center gap-2">
                          <span className="h-8 w-8 rounded-full rounded-sm bg-slate-900 p-1">
                            <img
                              src="https://static.lolesports.com/teams/1704375161752_T1_esports.png"
                              alt="t1"
                            />
                          </span>
                          <span className="font-medium text-muted-foreground">
                            T1
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-8 w-8 rounded-full rounded-sm bg-slate-900 p-1">
                            <img
                              src="https://static.lolesports.com/teams/1704375161752_T1_esports.png"
                              alt="t1"
                            />
                          </span>
                          <span className="font-medium text-muted-foreground">
                            T1
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col gap-1">
                        <span>3</span>
                        <span>0</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full bg-slate-400" />
                        <span className="font-medium text-muted-foreground">
                          Pendente
                        </span>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
