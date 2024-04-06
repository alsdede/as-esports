import {
  Calculator,
  Dog,
  Gamepad2,
  Home,
  Medal,
  SquareGanttChart,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export interface HeaderProps {}

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Dog className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/fixtures">
            <Gamepad2 className="h-4 w-4" />
            Jogos
          </NavLink>
          <NavLink to="/standings">
            <Medal className="h-4 w-4" />
            Classificação
          </NavLink>
          <NavLink to="/bets">
            <SquareGanttChart className="h-4 w-4" />
            Apostas
          </NavLink>
          <NavLink to="/calculator">
            <Calculator className="h-4 w-4" />
            Calculadoras
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
