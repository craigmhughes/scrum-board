import { Droppable } from "@hello-pangea/dnd"
import type { TaskCardType } from "../TaskCard"
import TaskCard from "../TaskCard"

interface SwimlaneInterface {
    title: string
    cards: TaskCardType[]
}

export default function Swimlane({
    title,
    cards
}: SwimlaneInterface) {
    const id = title.toLowerCase().replace(/\ /g, "-")
    return (
        <div>
            <div className="py-1 my-2">
                <h2 className="text-left text-lg font-normal">{title}</h2>
            </div>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                    {...provided.droppableProps}
                  >
                    <div className="rounded-lg p-2.5 py-3.25 flex flex-col gap-4 mb-6 lg:mb-0">
                        {cards.map((card, index) => <TaskCard {...card} index={index} />)}
                    </div>
                    {provided.placeholder}
                  </div>
                )}

            </Droppable>
            
        </div>
    )
}