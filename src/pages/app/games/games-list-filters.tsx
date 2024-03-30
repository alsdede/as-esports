import { Search, X } from 'lucide-react'

import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function GamesListFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="Nome da Liga" className="h-8 w-[320px]" />
      <Input placeholder="Nome do Time" className="h-8 w-auto" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
          <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="finish">Finalizado</SelectItem>
            <SelectItem value="inProgress">Em andamento</SelectItem>
          </SelectContent>
        </SelectTrigger>
      </Select>
      <DatePicker />
      <Button type="submit" variant="secondary" size="sm" className="h-8">
        <Search className="h4 mr-2 w-4" /> Filtrar Resultados
      </Button>
      <Button type="submit" variant="outline" size="sm" className="h-8">
        <X className="h4 mr-2 w-4" /> Remover Filtros
      </Button>
    </form>
  )
}
