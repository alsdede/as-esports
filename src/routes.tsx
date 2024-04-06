import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Calculator } from './pages/app/calculator/calculator'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Game } from './pages/app/game/game'
import { GamesList } from './pages/app/games/games-list'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { BetsList } from './pages/bets/bets-list'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/fixtures', element: <GamesList /> },
      { path: '/game', element: <Game /> },
      { path: '/bets', element: <BetsList /> },
      { path: '/calculator', element: <Calculator /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
])
