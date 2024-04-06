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

import { BetsListFilters } from './bets-lits-filters'

export function BetsList() {
  return (
    <>
      <Helmet title="Jogos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Apostas</h1>

        <div className="space-y-2.5">
          <BetsListFilters />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[85px]">ID</TableHead>
                  <TableHead className="w-[85px]">Data</TableHead>
                  <TableHead className="w-[85px]">Tipster</TableHead>
                  <TableHead className="w-[85px]">Casa</TableHead>
                  <TableHead className="w-[85px]">Jogo</TableHead>
                  <TableHead className="w-[140px]">Liga</TableHead>
                  <TableHead className="w-[300px]">Times</TableHead>
                  <TableHead className="w-[300px]">Método</TableHead>
                  <TableHead className="w-[300px]">Valor</TableHead>
                  <TableHead className="w-[300px]">Odd</TableHead>
                  <TableHead className="w-[100px]">Resultado</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>

                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-cs font-mono font-medium">
                      1
                    </TableCell>
                    <TableCell className="text-cs font-mono font-medium">
                      30/03/2024
                    </TableCell>
                    <TableCell className="text-muted-foreground">-</TableCell>
                    <TableCell className="text-muted-foreground">
                      BET365
                    </TableCell>
                    <TableCell className="text-muted-foreground">LOL</TableCell>
                    <TableCell className="text-muted-foreground">LCK</TableCell>
                    <TableCell>
                      <div className="flex flex-col  gap-1">
                        <div className="flex items-center gap-2">
                          <span className="h-8 w-8 rounded-sm bg-slate-900 p-1">
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
                          <span className="h-8 w-8 rounded-sm bg-slate-900 p-1">
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
                    <TableCell className="font-medium">ML</TableCell>
                    <TableCell className="text-muted-foreground">
                      R$1.200,00
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      2.00
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      R$2.400,00
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
