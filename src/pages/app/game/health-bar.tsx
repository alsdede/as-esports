type HealthBarProps = {
  currentHealth: number
  maxHealth: number
}
export function HealthBar({ currentHealth, maxHealth }: HealthBarProps) {
  return (
    <div className="relative h-6 w-full min-w-24 rounded-xl bg-slate-400">
      <div
        style={{ width: percentage(currentHealth, maxHealth) + '%' }}
        className="h-6 rounded-full bg-green-500 transition ease-in-out"
      />
      <span className="z-100 absolute left-1/2 top-1/2 flex h-6 w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center align-middle">
        {' '}
        {currentHealth} / {maxHealth}
      </span>{' '}
    </div>
  )
}

function percentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue
}
