import { zodResolver } from '@hookform/resolvers/zod'
import { Table, useReactTable } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFilter } from '@/context/filterContext'

import { Event, GameListTable } from './games-list.types'

const FormSchema = z.object({
  team: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  status: z.string(),
  league: z.string(),
  date: z.date(),
})

type GamesListFiltersProps = {
  leagues: any
  table: Table<Event>
}
export function GamesListFilters({ leagues, table }: GamesListFiltersProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
      team: 'all',
      league: 'all',
      status: 'all',
    },
  })
  const { updateFilter } = useFilter()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('DATA', data)
    updateFilter(data)
    toast.success(data.league)
  }
  return (
    <Form {...form}>
      <form
        className="flex items-center gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <span className="text-sm font-semibold">Filtros:</span>

        <Input
          id="team"
          placeholder="Nome do Time"
          className="h-8 w-auto"
          value={(table.getColumn('teams')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('teams')?.setFilterValue(event.target.value)
          }
        />

        {/* <Select>
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue />
            <SelectContent>
              <SelectItem value="all">Todas as Ligas</SelectItem>
              {leagues.map((league) => (
                <SelectItem key={league.slug} value={league.slug}>
                  {league.name}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>

        <Select
          defaultValue={field.value}
          value={field.value}
          onValueChange={field.onChange}
        >
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue />
            <SelectContent>
              <SelectItem value="all">Todas as Ligas</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="inProgress">Em andamento</SelectItem>
              <SelectItem value="finished">Finalizado</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select> */}

        <DatePicker register={form.register('date')} />
        <Button type="submit" variant="secondary" size="sm" className="h-8">
          <Search className="h4 mr-2 w-4" /> Filtrar Resultados
        </Button>
        <Button type="submit" variant="outline" size="sm" className="h-8">
          <X className="h4 mr-2 w-4" /> Remover Filtros
        </Button>
      </form>
    </Form>
  )
}
