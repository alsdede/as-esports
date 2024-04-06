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

export function BetsListFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="Casa" className="h-8 w-auto" />
      <Input placeholder="Nome da Liga" className="h-8 w-[320px]" />

      <Input placeholder="Nome do Time" className="h-8 w-auto" />
      <Input placeholder="Tipster" className="h-8 w-auto" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
          <SelectContent>
            <SelectItem value="all">Todos Métodos</SelectItem>
            <SelectItem value="pending">ML</SelectItem>
            <SelectItem value="finish">OVER KILL</SelectItem>
            <SelectItem value="inProgress">OVER TIME</SelectItem>
          </SelectContent>
        </SelectTrigger>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
          <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            <SelectItem value="pending">Vitória</SelectItem>
            <SelectItem value="finish">Derrota</SelectItem>
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
