import { env } from '@/env'

const ITEMS = [
  {
    id: '1',
    src: 'https://ddragon.bangingheads.net/cdn/14.1.1/img/item/6610.png',
  },
  {
    id: '2',
    src: 'https://ddragon.bangingheads.net/cdn/14.1.1/img/item/6610.png',
  },
  {
    id: '3',
    src: 'https://ddragon.bangingheads.net/cdn/14.1.1/img/item/6610.png',
  },
  {
    id: '4',
    src: 'https://ddragon.bangingheads.net/cdn/14.1.1/img/item/6610.png',
  },
  {
    id: '5',
    src: 'https://ddragon.bangingheads.net/cdn/14.1.1/img/item/6610.png',
  },
  {
    id: '6',
    src: 'https://ddragon.bangingheads.net/cdn/14.1.1/img/item/6610.png',
  },
  {
    id: '7',
    src: 'https://ddragon.bangingheads.net/cdn/14.1.1/img/item/6610.png',
  },
]
export interface Item {
  name: string
  description: string
  colloq: string
  plaintext: string
  into: string[]
  gold: any
}
export type ItemsProps = {
  playerId: number
  itemsFrame: any
  items: Item[]
}
export function Items({ playerId, itemsFrame, items }: ItemsProps) {
  console.log('items', itemsFrame)
  return (
    <div className="flex min-w-32 flex-row flex-wrap items-center justify-center gap-0">
      {ITEMS.map((item, index) => (
        <div key={`${playerId}-${index}`}>
          <img
            src={`${env.VITE_ITEMS_URL}${lastFrameItems[i]}.png`}
            alt="item"
            className="h-8 w-8 rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}
