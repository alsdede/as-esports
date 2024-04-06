import { Helmet } from 'react-helmet-async'

import { MonthBetsAmountCard } from './month-bets-amount-card'
import { MonthLosesBetsCard } from './month-loses-bets-card'
import { MonthRevenueCard } from './month-revenue-card'
import { MonthWinsBetsCard } from './month-wins-bets-card'
import { RevenueChart } from './revenue-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthBetsAmountCard />
          {/* <DayBetsAmountCard /> */}
          <MonthWinsBetsCard />
          <MonthLosesBetsCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
        </div>
      </div>
    </>
  )
}
