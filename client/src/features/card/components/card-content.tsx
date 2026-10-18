import CardItem from "./card-item"
import { useGetCards } from "../query"
import type { Card } from "../type"

export default function CardContent() {
  const { data } = useGetCards()
  const cards = data ?? []

  return (
    <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4">
      {cards.length > 0 ? (
        cards.map((card: Card) => <CardItem key={card.id} card={card} />)
      ) : (
        <div className="col-span-full my-20 size-full text-center">
          <p className="text-muted-foreground">등록된 카드가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
